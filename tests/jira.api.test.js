const {
  fetchStoriesByRelease,
  fetchIssueLinksFromStoriesByRelease,
  login,
  logout,
  filterByCriteriaAndKeys,
  getAuthHeader,
} = require("../api/jiraApiClient");
const jiraMocker = require("./mock/jira");
const axios = require("../config/axios-config");
const fetchStoriesByReleaseData = require("./mock/jiraDataResponses/jiraFetchStoriesByRelease");
const fetchStoriesBadRequest = require("./mock/jiraDataResponses/jiraBadRequestFetchStoriesByRelease");
const fetchDataBadRequestWrongParameter = require("./mock/jiraDataResponses/jiraBadRequestWrongParameter");
const fetchAutomatedTests = require("./mock/jiraDataResponses/jiraFetchAutomatedTests");
const nock = require("nock");
const _ = require("lodash");
const rewire = require("rewire");
const jiraApiClient = rewire("../api/jiraApiClient");
const stringifyJqlCriteria = jiraApiClient.__get__("stringifyJqlCriteria");

describe("Jira API", () => {
  describe("Login to JIRA", () => {
    beforeAll(() => {
      myMockedAxiosInstance = axios(jiraMocker.url).get();
      nock(jiraMocker.url)
        .post(jiraMocker.endpoints.login, jiraMocker.credentials)
        .reply(200, jiraMocker.responses.loginSuccessful.data);

      nock(jiraMocker.url)
        .post(jiraMocker.endpoints.login, getWrongCreds())
        .reply(401, jiraMocker.responses.loginFailedWrongCredentials.data);
    });
    it("should be correctly construct the authentication header", () => {
      const session = "JSESSIONID=0123456789ABCDEF";
      const result = getAuthHeader(session);
      expect(result).not.toBeNull();
      expect(result).toHaveProperty("Cookie", session);
    });

    it("should return a session identifier after sucessful login", async () => {
      const result = await login(
        myMockedAxiosInstance,
        jiraMocker.credentials.username,
        jiraMocker.credentials.password
      );
      expect(result).toMatch(
        `${jiraMocker.responses.loginSuccessful.data.session.name}=${jiraMocker.responses.loginSuccessful.data.session.value}`
      );
    });
    it("should throw an error in case of a failed login due to wrong credentials", async () => {
      await expect(
        login(myMockedAxiosInstance, ...Object.values(getWrongCreds()))
      ).rejects.toEqual("Request failed with status code 401: Login failed");
    });
  });

  describe("Logout from JIRA", () => {
    beforeAll(() => {
      myMockedAxiosInstance = axios(jiraMocker.url).get();
      const successHeaders = jiraMocker.responses.logoutSuccessful.headers;
      nock(jiraMocker.url, { successHeaders })
        .delete(jiraMocker.endpoints.logout)
        .reply(204, jiraMocker.responses.logoutSuccessful.data);

      const failedHeaders =
        jiraMocker.responses.logoutFailedNotLoggedIn.headers;
      nock(jiraMocker.url, { failedHeaders })
        .delete(jiraMocker.endpoints.logout)
        .reply(401, jiraMocker.responses.logoutFailedNotLoggedIn.data);
    });

    it("should be possible to logout given that a valid login session exists", async () => {
      const result = await logout(
        myMockedAxiosInstance,
        jiraMocker.responses.logoutSuccessful.headers.reqheaders
      );
      expect(_.isEmpty(result.data)).toBeTruthy();
    });

    it("should throw an error when trying to logout while not logged-in", async () => {
      await expect(
        logout(
          myMockedAxiosInstance,
          jiraMocker.responses.logoutFailedNotLoggedIn.headers.badheaders
        )
      ).rejects.toEqual(
        "Request failed with status code 401: You are not authenticated. Authentication required to perform this operation."
      );
    });
  });

  describe("Fetching User Stories from JIRA for a given Release", () => {
    beforeAll(() => {
      myMockedAxiosInstance = axios(jiraMocker.url).get();

      nock(jiraMocker.url)
        .post(jiraMocker.endpoints.search, /Release XYZ/g)
        .reply(200, fetchStoriesByReleaseData);

      nock(jiraMocker.url)
        .post(jiraMocker.endpoints.search, /Release ABC/g)
        .reply(400, fetchStoriesBadRequest);
    });

    it("should return a successful response with data available", async () => {
      const result = await fetchIssueLinksFromStoriesByRelease(
        myMockedAxiosInstance,
        jiraMocker.responses.successfulDataRequestTemplate.headers.reqheaders,
        "Release XYZ"
      );
      expect(!_.isEmpty(result));
    });

    it("should cause an error when the passed Release isn't known", async () => {
      await expect(
        fetchIssueLinksFromStoriesByRelease(
          myMockedAxiosInstance,
          jiraMocker.responses.successfulDataRequestTemplate.headers.reqheaders,
          "Release ABC"
        )
      ).rejects.toEqual(
        "Request failed with status code 400: The value 'Release ABC' does not exist for the field 'fixVersion'."
      );
    });
  });
  describe("Filtering via Jira API", () => {
    beforeAll(() => {
      myMockedAxiosInstance = axios(jiraMocker.url).get();
      nock(jiraMocker.url)
        .post(jiraMocker.endpoints.search, /DIG-5555/g)
        .reply(400, fetchDataBadRequestWrongParameter);
      nock(jiraMocker.url)
        .post(jiraMocker.endpoints.search, /Automation Type/g)
        .reply(200, fetchAutomatedTests);
    });
    it("should return results without any error in the expected format", async () => {
      const result = await filterByCriteriaAndKeys(
        myMockedAxiosInstance,
        jiraMocker.responses.successfulDataRequestTemplate.headers.reqheaders,
        ["DIG-28452", "DIG-28454", "DIG-28455", "DIG-28456", "DIG-28318"],
        { "Automation Type": "yes", "Test Type": "Automation" }
      );
      expect(result).not.toBeNull();
      expect(result.issues.length).toBeGreaterThan(0);
    });

    it("it should cause an error when a parameter value is not known to Jira", async () => {
      await expect(
        filterByCriteriaAndKeys(
          myMockedAxiosInstance,
          jiraMocker.responses.successfulDataRequestTemplate.headers.reqheaders,
          ["DIG-5555", "DIG-28454", "DIG-28455", "DIG-28456", "DIG-28318"],
          { "Automation Type": "wrong", "Test Type": "parameter" }
        )
      ).rejects.toEqual(
        "Request failed with status code 400: The option 'wrong' for field 'Automation Candidate' does not exist.;The option 'parameter' for field 'Test Type' does not exist."
      );
    });
  });

  describe("Transform JS-Object with Criteria into stringified JQL Criteria", () => {
    it("should concatenate key-value pairs from a JS-Object to a JQL with all Criteria combined with AND", () => {
      const criteria = {
        "Automation Type": "yes",
        "Test Type": "Automated",
      };
      const jql = stringifyJqlCriteria(criteria);
      expect(jql).toEqual(
        '"Automation Type" = "yes" AND "Test Type" = "Automated"'
      );
    });
  });
});

function getWrongCreds() {
  return {
    username: "wrongUsername",
    password: "wrongPassword",
  };
}
