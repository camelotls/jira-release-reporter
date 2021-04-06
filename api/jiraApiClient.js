const _ = require("lodash");
const { Endpoints } = require("./constants");

const basicHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

const getAuthHeader = (session) => {
  return {
    Cookie: session,
  };
};

const login = async (axiosInstance, jiraUser, jiraPass) => {
  const authBody = { username: jiraUser, password: jiraPass };
  let session;
  try {
    const response = await axiosInstance.post(Endpoints.AUTH, authBody, {
      headers: basicHeaders(),
    });
    session = `${response.data.session.name}=${response.data.session.value}`;
    console.debug("log-in to jira successful");
  } catch (error) {
    const errorMessage = constructVerboseErrorMessage(error);
    console.error(errorMessage);
    throw errorMessage;
  }
  return session;
};

const logout = async (axiosInstance, jiraAuthHeaders) => {
  const headers = {
    ...jiraAuthHeaders,
    ...basicHeaders(),
  };
  let result;
  try {
    result = await axiosInstance.delete(Endpoints.AUTH, {
      headers: headers,
    });
    console.debug("log-out from jira successful");
  } catch (error) {
    const errorMessage = constructVerboseErrorMessage(error);
    console.error(errorMessage);
    throw errorMessage;
  }
  return result;
};

const fetchIssueLinksFromStoriesByRelease = async (
  axiosInstance,
  jiraAuthHeaders,
  releaseVersion,
  project
) => {
  const headers = {
    ...jiraAuthHeaders,
    ...basicHeaders(),
  };
  const query = {
    jql: `project = ${project} AND issuetype = Story AND fixVersion = "${releaseVersion}"`,
    startAt: 0,
    fields: ["issuelinks"],
  };
  let result;
  try {
    const response = await searchWithQuery(axiosInstance, query, headers);
    result = response.data;
  } catch (error) {
    const errorMessage = constructVerboseErrorMessage(error);
    console.error(errorMessage);
    throw errorMessage;
  }
  return result;
};

const filterByCriteriaAndKeys = async (
  axiosInstance,
  jiraAuthHeaders,
  keys,
  criteria
) => {
  const headers = {
    ...jiraAuthHeaders,
    ...basicHeaders(),
  };
  const query = {
    jql: `${stringifyJqlCriteria(criteria)} AND key in (${keys.join(",")})`,
    startAt: 0,
    fields: ["key"],
  };
  let result;
  try {
    const response = await searchWithQuery(axiosInstance, query, headers);
    result = response.data;
  } catch (error) {
    const errorMessage = constructVerboseErrorMessage(error);
    console.error(errorMessage);
    throw errorMessage;
  }
  return result;
};

const constructVerboseErrorMessage = (error) => {
  let errorMessage = error.message;
  return (
    errorMessage +
    ": " +
    _.reduce(error.response.data.errorMessages, (i, j) => `${i};${j}`)
  );
};

const stringifyJqlCriteria = (criteria) => {
  let tokenizedCriteria = [];
  for (c of Object.entries(criteria)) {
    tokenizedCriteria.push(`\"${c[0]}\" = \"${c[1]}\"`);
  }
  let stringifiedCriteria = "";
  for (let index = 0; index < tokenizedCriteria.length; index++) {
    stringifiedCriteria += tokenizedCriteria[index];
    if (index < tokenizedCriteria.length - 1) {
      stringifiedCriteria += " AND ";
    }
  }
  return stringifiedCriteria;
};

const searchWithQuery = async (axiosInstance, query, headers) => {
  return await axiosInstance.post(Endpoints.SEARCH, query, {
    headers: headers,
  });
};

module.exports = {
  login,
  logout,
  getAuthHeader,
  fetchIssueLinksFromStoriesByRelease,
  filterByCriteriaAndKeys,
};
