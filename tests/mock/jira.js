const JIRA_MOCK = {
  url: "http://localhost",
  credentials: {
    username: "jester",
    password: "retsej",
  },
  searchParameters: {
    project: "PROJECT UNO",
    releaseVersion: "2.22.2",
  },
  endpoints: {
    login: "/auth/1/session",
    logout: "/auth/1/session",
  },
  responses: {
    loginSuccessful: {
      statusCode: 200,
      data: {
        session: {
          name: "JSESSIONID",
          value: "8AB90EADF9C5BE3A73594BC88F035DFA",
        },
      },
    },
    loginFailedWrongCredentials: {
      statusCode: 401,
      data: {
        errorMessages: ["Login failed"],
        errors: {},
      },
    },
    logoutSuccessful: {
      statusCode: 204,
      data: {},
      headers: {
        reqheaders: {
          "Content-Type": "application/json",
          Cookie: "JSESSIONID=7ADC147372C3C9C31CDB0B09E66CB205",
        },
      },
    },
    logoutFailedNotLoggedIn: {
      statusCode: 401,
      data: {
        errorMessages: [
          "You are not authenticated. Authentication required to perform this operation.",
        ],
        errors: {},
      },
      headers: {
        badheaders: {
          "Content-Type": "application/json",
          Cookie: "JSESSIONID=8ADC147372C3C9C31CDB0B09E66CB204",
        },
      },
    },
    successfulDataRequestTemplate: {
      statusCode: 200,
      data: {
        //! Data has to be set in the test as a preparation step
      },
      headers: {
        reqheaders: {
          "Content-Type": "application/json",
          Cookie: "JSESSIONID=7ADC147372C3C9C31CDB0B09E66CB205",
        },
      },
    },
    badRequestDataTemplate: {
      statusCode: 400,
      data: {
        //! Data has to be set in the test as a preparation step
      },
      headers: {
        reqheaders: {
          "Content-Type": "application/json",
          Cookie: "JSESSIONID=7ADC147372C3C9C31CDB0B09E66CB205",
        },
      },
    },
  },
};

module.exports = JIRA_MOCK;
