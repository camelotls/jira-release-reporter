const _ = require("lodash");
const axios = require("../config/axios-config.js");
let {
  login,
  logout,
  getAuthHeader,
  fetchIssueLinksFromStoriesByRelease,
  filterByCriteriaAndKeys,
} = require("../api/jiraApiClient.js");
const { reducer, takeKeys } = require("./jrrReducer");
const table = require("console.table");

const jrrMain = async (jrrConfig) => {
  const axiosInstance = axios(jrrConfig.jira.jiraBaseURL).get();

  const sessionId = await login(
    axiosInstance,
    jrrConfig.jira.jiraUser,
    jrrConfig.jira.jiraPass
  );

  jrrConfig;
  const authHeaders = getAuthHeader(sessionId);

  const result = await fetchIssueLinksFromStoriesByRelease(
    axiosInstance,
    authHeaders,
    jrrConfig.releaseVersion,
    jrrConfig.project
  );

  const issues = takeIssues(jrrConfig.issues, result.issues);
  const filteredIssues = await filterIssues(axiosInstance, issues, authHeaders);
  const shrinkedData = shrinkToCountPerTitle(filteredIssues);

  console.debug(shrinkedData);
  console.log(printResultsInTable(shrinkedData));

  logout(axiosInstance, authHeaders);

  console.debug(JSON.stringify(filteredIssues, null, 2));
};

const printResultsInTable = (shrinkedData) => {
  return table.getTable(shrinkedData);
};

const filterIssues = async (axiosInstance, issuesToFilter, authHeaders) => {
  const issuesWithCriteria = [...issuesToFilter];
  const issuesWithoutCriteria = _.remove(issuesWithCriteria, (i) => {
    return !i.criteria;
  });

  const filteredIssues = await Promise.all(
    _.map(
      issuesWithCriteria,
      async ({ type, status, issues, criteria, title, issuesCount }) => {
        const filteredByCriteriaAndKeys = await filterByCriteriaAndKeys(
          axiosInstance,
          authHeaders,
          issues,
          criteria
        );
        const issueKeys = takeKeys(filteredByCriteriaAndKeys.issues);
        return {
          type: type,
          status: status,
          title: title,
          criteria: criteria,
          issuesCount: issueKeys.length,
          issues: issueKeys,
        };
      }
    )
  );
  return [...issuesWithoutCriteria, ...filteredIssues];
};

const shrinkToCountPerTitle = (theData) => {
  return _.map(theData, (theItem) => {
    return {
      Type: theItem.title,
      Amount: theItem.issuesCount,
    };
  });
};

const takeIssues = (jrrConfigIssues, issuesFromJiraAPI) => {
  return (reducedIssues = _.map(
    jrrConfigIssues,
    ({ type, status, criteria, title }) => {
      const issues = reducer(issuesFromJiraAPI, type, status);
      return {
        type: type,
        status: status,
        title: title,
        criteria: criteria,
        issues: issues,
        issuesCount: issues.length,
      };
    }
  ));
};

module.exports = jrrMain;
