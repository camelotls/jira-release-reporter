/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
const _ = require('lodash');
const { Endpoints } = require('./constants');

const basicHeaders = () => ({
  'Content-Type': 'application/json',
});

const getAuthHeader = (cookie) => ({
  Cookie: `${cookie.jsessionId};${cookie.awslalb}`,
});

const login = async (axiosInstance, jiraUser, jiraPass) => {
  const authBody = { username: jiraUser, password: jiraPass };
  let cookie;
  try {
    const response = await axiosInstance.post(Endpoints.AUTH, authBody, {
      headers: basicHeaders(),
    });
    const awsalb = response.headers['set-cookie'] && response.headers['set-cookie'][0].split(';')[0];
    cookie = { jsessionId: `${response.data.session.name}=${response.data.session.value}`, awslalb: awsalb };
    console.debug('log-in to jira successful');
  } catch (error) {
    const errorMessage = constructVerboseErrorMessage(error);
    console.error(errorMessage);
    throw errorMessage;
  }
  return cookie;
};

const logout = async (axiosInstance, jiraAuthHeaders) => {
  const headers = {
    ...jiraAuthHeaders,
    ...basicHeaders(),
  };
  let result;
  try {
    result = await axiosInstance.delete(Endpoints.AUTH, {
      headers,
    });
    console.debug('log-out from jira successful');
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
  project,
) => {
  const headers = {
    ...jiraAuthHeaders,
    ...basicHeaders(),
  };
  const query = {
    jql: `project = ${project} AND issuetype = Story AND fixVersion = "${releaseVersion}"`,
    startAt: 0,
    fields: ['issuelinks'],
    maxResults: 1000,
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

const getAllFields = async (axiosInstance,
  jiraAuthHeaders) => {
  const headers = {
    ...jiraAuthHeaders,
    ...basicHeaders(),
  };
  let result;
  try {
    const response = await axiosInstance.get(Endpoints.FIELD_META, { headers });
    result = response.data;
  } catch (error) {
    const errorMessage = constructVerboseErrorMessage(error);
    console.log(errorMessage);
    throw errorMessage;
  }
  return result;
};

const getThisIssue = async (axiosInstance, jiraAuthHeaders, apiUrl) => {
  const headers = {
    ...jiraAuthHeaders,
    ...basicHeaders(),
  };
  let result;
  try {
    const response = await axiosInstance.get(apiUrl, { headers });
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
  criteria,
  exclusionCriteria,
) => {
  const headers = {
    ...jiraAuthHeaders,
    ...basicHeaders(),
  };
  const query = {
    jql: `${stringifyJqlCriteria(criteria, exclusionCriteria)} AND key in (${keys.join(',')})`,
    startAt: 0,
    fields: ['key'],
    maxResults: 1000,
  };
  let result;
  try {
    if (_.isEmpty(keys)) {
      return [];
    }
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
  const errorMessage = error.message;
  console.log(`${errorMessage} => ${error.response}`);
  return (
    `${errorMessage
    }: ${
      _.reduce(error.response.data.errorMessages, (i, j) => `${i};${j}`)}`
  );
};

const stringifyJqlCriteria = (criteria, exclusionCriteria) => {
  if (criteria && exclusionCriteria) {
    return `${stringifyCriteria(criteria)} AND ${stringifyCriteria(exclusionCriteria, true)}`;
  }
  if (!criteria && exclusionCriteria) {
    return stringifyCriteria(exclusionCriteria, true);
  }
  if (criteria && !exclusionCriteria) {
    return stringifyCriteria(criteria);
  }
};

const stringifyCriteria = (criteria, exclude = false) => {
  const tokenizedCriteria = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const c of Object.entries(criteria)) {
    let clause;
    if (c[1].constructor === Array) {
      const operator = exclude ? 'NOT IN' : 'IN';
      clause = `"${c[0]}" ${operator} (${c[1]})`;
    } else if (_.toLower(c[1]) === 'null') {
      clause = `"${c[0]}" is null`;
    } else if (_.toLower(c[1]) === 'not null') {
      clause = `"${c[0]}" is not null`;
    } else {
      const operator = exclude ? '!=' : '=';
      clause = `"${c[0]}" ${operator} "${c[1]}"`;
    }
    tokenizedCriteria.push(clause);
  }
  let stringifiedCriteria = '';
  for (let index = 0; index < tokenizedCriteria.length; index += 1) {
    stringifiedCriteria += tokenizedCriteria[index];
    if (index < tokenizedCriteria.length - 1) {
      stringifiedCriteria += ' AND ';
    }
  }
  return stringifiedCriteria;
};

// eslint-disable-next-line no-return-await
const searchWithQuery = async (axiosInstance, query, headers) => await axiosInstance.post(Endpoints.SEARCH, query, {
  headers,
});

module.exports = {
  login,
  logout,
  getAuthHeader,
  fetchIssueLinksFromStoriesByRelease,
  filterByCriteriaAndKeys,
  getAllFields,
  getThisIssue,
};
