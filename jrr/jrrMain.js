/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
const _ = require('lodash');
const table = require('console.table');
const axios = require('../config/axios-config.js');
const appConfig = require('../config/app-config');
const renderFactory = require('./renderers/renderFactory');
const fsWriter = require('./filesystem/fsWriter');
const { registerHandlebarsHelpers } = require('./renderers/handlebarsHelpers');

let {
  login,
  logout,
  getAuthHeader,
  fetchIssueLinksFromStoriesByRelease,
  filterByCriteriaAndKeys,
} = require('../api/jiraApiClient.js');
const { reducer, takeKeys } = require('./jrrReducer');

const jrrMain = async (jrrConfig) => {
  registerHandlebarsHelpers();

  const axiosInstance = axios(jrrConfig.jira.jiraBaseURL).get();

  const cookie = await login(
    axiosInstance,
    jrrConfig.jira.jiraUser,
    jrrConfig.jira.jiraPass,
  );

  const authHeaders = getAuthHeader(cookie);

  const result = await fetchIssueLinksFromStoriesByRelease(
    axiosInstance,
    authHeaders,
    jrrConfig.releaseVersion,
    jrrConfig.project,
  );

  const issues = takeIssues(jrrConfig.issues, result.issues);
  const filteredIssues = await filterIssues(axiosInstance, issues, authHeaders);
  const shrinkedData = shrinkToCountPerTitleAndDetails(filteredIssues, jrrConfig.jira.jiraBaseURL);

  const totalTests = _.remove(filteredIssues, (item) => item.title === 'Total Tests')[0].issues;
  const rest = _.union(..._.map(filteredIssues, (item) => item.issues));
  const difference = _.difference(totalTests, rest);
  console.log(printResultsInTable(shrinkedData.overview));
  console.log(printResultsInTable(_.map(difference, (item) => ({ 'Not Categorized': item }))));

  const missingOnes = createKeyLinkPairForIssues(difference, jrrConfig.jira.jiraBaseURL);
  shrinkedData.missing = missingOnes;

  logout(axiosInstance, authHeaders);

  if (appConfig.EXPORTABLE_FORMATS.includes(jrrConfig.format)) {
    const renderer = renderFactory(jrrConfig.format);
    const output = renderer.render(shrinkedData);
    fsWriter(output.filename, output.content);
  }

  // * uncomment for debug purposes
  // console.debug(JSON.stringify(filteredIssues, null, 2));
};

const printResultsInTable = (shrinkedData) => table.getTable(shrinkedData);

const filterIssues = async (axiosInstance, issuesToFilter, authHeaders) => {
  const issuesWithCriteria = [...issuesToFilter];
  const issuesWithoutCriteria = _.remove(issuesWithCriteria, (i) => !i.criteria && !i.exclusionCriteria);

  const filteredIssues = await Promise.all(
    _.map(
      issuesWithCriteria,
      async ({
        type, status, issues, criteria, exclusionCriteria, title,
      }) => {
        const filteredByCriteriaAndKeys = await filterByCriteriaAndKeys(
          axiosInstance,
          authHeaders,
          issues,
          criteria,
          exclusionCriteria,
        );
        const issueKeys = takeKeys(filteredByCriteriaAndKeys.issues);
        return {
          type,
          status,
          title,
          criteria,
          issuesCount: issueKeys.length,
          issues: issueKeys,
        };
      },
    ),
  );
  return [...issuesWithoutCriteria, ...filteredIssues];
};

const shrinkToCountPerTitleAndDetails = (theData, jiraBaseURL) => ({
  overview: [
    ..._.map(theData, (theItem) => ({
      Type: theItem.title,
      Amount: theItem.issuesCount,
    })),
  ],
  details: [
    ..._.map(theData, (theItem) => ({
      Type: theItem.title,
      Amount: theItem.issuesCount,
      Issues: createKeyLinkPairForIssues(theItem.issues, jiraBaseURL),
    })),
  ],
});

// eslint-disable-next-line no-return-assign
const takeIssues = (jrrConfigIssues, issuesFromJiraAPI) => (_.map(
  jrrConfigIssues,
  ({
    type, status, criteria, title, exclusionCriteria,
  }) => {
    const issues = reducer(issuesFromJiraAPI, type, status);
    return {
      type,
      status,
      title,
      criteria,
      issues,
      issuesCount: issues.length,
      exclusionCriteria,
    };
  },
));

const createKeyLinkPairForIssues = (issues, jiraBaseURL) => _.map(issues, (issue) => ({
  key: issue,
  url: `${_.trimEnd(jiraBaseURL, '/rest')}/browse/${issue}`,
}));

module.exports = jrrMain;
