const rewire = require("rewire");
const data = require("./mock/jiraDataResponses/jiraFetchStoriesByRelease");
const _ = require("lodash");
const jiraReducer = rewire("../jrr/jrrReducer");
const filterByTypeAndStatus = jiraReducer.__get__("filterByTypeAndStatus");
const { reducer } = require("../jrr/jrrReducer");

describe("The Reducer's functions", () => {
  describe("Filter a JIRA response containing issues of type 'story' by selecting the related Test issues with status 'Done'", () => {
    it("should return the expected amount of tests which appear as links to a story", () => {
      const linkedTests = filterByTypeAndStatus(data.issues, "Test", "Done");
      expect(linkedTests).toHaveLength(12);
      linkedTests.map((linkedTest) => {
        expect(linkedTest.fields).not.toBeNull();
        expect(linkedTest.key).not.toBeNull();
        expect(linkedTest.fields.status.name).toEqual("Done");
        expect(linkedTest.fields.issuetype.name).toEqual("Test");
      });
    });

    it("should return the keys of the filtered issues", () => {
      const keys = reducer(data.issues, "Test", "Done");
      expect(keys).toHaveLength(12);
      expect(keys).toEqual(
        expect.arrayContaining([
          "DIG-28452",
          "DIG-28454",
          "DIG-28455",
          "DIG-28456",
          "DIG-28318",
        ])
      );
    });
  });
});
