const {
  fetchStoriesByRelease,
  login,
  logout,
} = require("../api/jiraApiClient");
const jiraMocker = require("./mock/jira");
const axios = require("../config/axios-config");
const fetchStoriesByReleaseData = require("./mock/jiraDataResponses/jiraFetchStoriesByRelease");
const fetchStoriesBadRequest = require("./mock/jiraDataResponses/jiraBadRequestFetchStoriesByRelease");
const nock = require("nock");
const _ = require("lodash");

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
      ).rejects.toEqual(
        "Error while trying to log-in to Jira Error: Request failed with status code 401"
      );
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
        "Error while trying to log-out from Jira Error: Request failed with status code 401"
      );
    });
  });

  describe("Fetching User Stories from JIRA for a given Release", () => {
    beforeAll(() => {
      myMockedAxiosInstance = axios(jiraMocker.url).get();

      nock(jiraMocker.url)
        .post("/api/2/search", /Release XYZ/g)
        .reply(200, fetchStoriesByReleaseData);

      nock(jiraMocker.url)
        .post("/api/2/search", /Release ABC/g)
        .reply(400, fetchStoriesBadRequest);
    });

    it("should return a successful response with data available", async () => {
      const result = await fetchStoriesByRelease(
        myMockedAxiosInstance,
        jiraMocker.responses.successfulDataRequestTemplate.headers.reqheaders,
        "Release XYZ"
      );
      expect(!_.isEmpty(result));
    });

    it("should cause an error when the passed Release isn't known", async () => {
      await expect(
        fetchStoriesByRelease(
          myMockedAxiosInstance,
          jiraMocker.responses.successfulDataRequestTemplate.headers.reqheaders,
          "Release ABC"
        )
      ).rejects.toEqual(
        "Error while trying to fetch stories Error: Request failed with status code 400"
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
