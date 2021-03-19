const rewire = require("rewire");
const issuesFromJiraAPI = require("./mock/jiraDataResponses/jiraFetchStoriesByRelease")
  .issues;
const jrrMain = rewire("../jrr/jrrMain");
const takeOutwardIssues = jrrMain.__get__("takeOutwardIssues");
const filterOutwardIssues = jrrMain.__get__("filterOutwardIssues");
const _ = require("lodash");
let { filterByCriteriaAndKeys } = require("../api/jiraApiClient");
const fetchAutomatedTests = require("./mock/jiraDataResponses/jiraFetchAutomatedTests");

describe("JIRA Release Reporter Main function", () => {
  describe("When having several types of issues", () => {
    it("should return a collection containing both types with the according status as outward issues to the parent story", () => {
      const jrrConfigIssues = [
        {
          type: "Story",
          status: "Done",
        },
        {
          type: "Test",
          status: "Done",
          criteria: {
            "Automation Type": "yes",
            "Test Type": "Automated",
          },
        },
      ];
      const outwardIssues = takeOutwardIssues(
        jrrConfigIssues,
        issuesFromJiraAPI
      );
      expect(outwardIssues).not.toBeNull();
      expect(outwardIssues).toHaveLength(2);

      const stories = _.filter(outwardIssues, (outwardIssue) => {
        return outwardIssue.type === "Story";
      })[0];

      const tests = _.filter(outwardIssues, (outwardIssue) => {
        return outwardIssue.type === "Test";
      })[0];

      expect(stories.issues).toHaveLength(1);
      expect(tests.issues).toHaveLength(12);

      expect(tests.criteria).toEqual(jrrConfigIssues[1].criteria);
    });
  });

  describe("When filtering out the outward issues by applying the configured criteria", () => {
    it("should return the filtered values without any errors", () => {
      filterByCriteriaAndKeys = jest.fn().mockReturnValue(fetchAutomatedTests);

      const jrrConfigIssues = [
        {
          type: "Story",
          status: "Done",
        },
        {
          type: "Test",
          status: "Done",
          criteria: {
            "Automation Type": "yes",
            "Test Type": "Automated",
          },
        },
      ];
      const outwardIssues = takeOutwardIssues(
        jrrConfigIssues,
        issuesFromJiraAPI
      );
      expect(outwardIssues).not.toBeNull();
      expect(outwardIssues).toHaveLength(2);

      const filteredOutwardIssues = filterOutwardIssues(outwardIssues, {});
      expect(filteredOutwardIssues).not.toBeNull();
      _.each(filterOutwardIssues, (item) => {
        expect(item).toHaveProperty("issues");
      });
      expect(
        _.some(filteredOutwardIssues, (some) => {
          return !_.isNull(some) && !_.isEmpty(some);
        })
      ).toBeTruthy();
    });
  });
});
