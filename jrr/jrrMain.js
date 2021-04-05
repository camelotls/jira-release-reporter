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

  const outwardIssues = takeOutwardIssues(jiraConfig.issues, result.issues);
  const filteredOutwardIssues = filterOutwardIssues(outwardIssues, authHeaders);
  const shrinkedData = shrinkToCountPerTitle(filteredOutwardIssues);

  console.log(shrinkedData);
  console.log(printResultsInTable(shrinkedData));

  logout(axiosInstance, authHeaders);

  console.debug(JSON.stringify(filteredOutwardIssues, null, 2));
};

const printResultsInTable = (shrinkedData) => {
  return table.getTable(shrinkedData);
};

const filterOutwardIssues = async (outwardIssues, authHeaders) => {
  const outwardIssuesWithCriteria = [...outwardIssues];
  const outwardIssuesWithoutCriteria = _.remove(
    outwardIssuesWithCriteria,
    (i) => {
      return !i.criteria;
    }
  );

  const filteredOutwardIssues = await Promise.all(
    _.map(
      outwardIssuesWithCriteria,
      async ({ type, status, issues, criteria, title, issuesCount }) => {
        return {
          type: type,
          status: status,
          title: title,
          criteria: criteria,
          issuesCount: issuesCount,
          issues: takeKeys(
            await filterByCriteriaAndKeys(axios, authHeaders, issues, criteria)
              .issues
          ),
        };
      }
    )
  );
  return [...outwardIssuesWithoutCriteria, ...filteredOutwardIssues];
};

const shrinkToCountPerTitle = (theData) => {
  return _.map(theData, (theItem) => {
    return {
      Type: theItem.title,
      Amount: theItem.issuesCount,
    };
  });
};

const takeOutwardIssues = (jrrConfigIssues, issuesFromJiraAPI) => {
  return (outwardIssues = _.map(
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
