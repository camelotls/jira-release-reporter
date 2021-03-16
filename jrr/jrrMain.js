const _ = require("lodash");

const axios = require("../config/axios-config.js");
const {
  login,
  logout,
  getAuthHeader,
  fetchIssueLinksFromStoriesByRelease,
} = require("../api/jiraApiClient.js");
const reducer = require("./jrrReducer");

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

  // * take the keys from the filtered issues
  // * issue another query with parameters Automation Candidate = Yes AND Test Type = Automated to find the automated ones also get the field Automation Test Type.
  // * issue another query with the same parameters as above but with additionally Test Type = Automated, Manual to get the partially automated ones.

  logout(axiosInstance, authHeaders);
};

const takeOutwardIssues = (jrrConfigIssues, issuesFromJiraAPI) => {
  const outwardIssues = _.map(jrrConfigIssues, ({ type, status }) => {
    return reducer(issuesFromJiraAPI, type, status);
  });

  return _.flatMapDeep(outwardIssues, (issue) => {
    return issue;
  });
};

module.exports = jrrMain;
