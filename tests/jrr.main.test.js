const rewire = require("rewire");
const issuesFromJiraAPI = require("./mock/jiraDataResponses/jiraFetchStoriesByRelease")
  .issues;
const jrrMain = rewire("../jrr/jrrMain");
const takeOutwardIssues = jrrMain.__get__("takeOutwardIssues");
const filterOutwardIssues = jrrMain.__get__("filterOutwardIssues");
const shrinkToCountPerTitle = jrrMain.__get__("shrinkToCountPerTitle");
const printResultsInTable = jrrMain.__get__("printResultsInTable");
const _ = require("lodash");
const fetchAutomatedTests = require("./mock/jiraDataResponses/jiraFetchAutomatedTests");
jrrMain.__set__("filterByCriteriaAndKeys", async () => {
  return fetchAutomatedTests;
});

describe("JIRA Release Reporter Main function", () => {
  describe("When having several types of issues", () => {
    it("should return a collection containing both types with the according status as outward issues to the parent story", () => {
      const jrrConfigIssues = [
        {
          type: "Story",
          status: "Done",
          title: "Stories Done",
        },
        {
          type: "Test",
          status: "Done",
          title: "Automated Tests",
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
    it("should return the filtered values without any errors", async () => {
      const jrrConfigIssues = [
        {
          type: "Story",
          title: "Stories",
          status: "Done",
        },
        {
          type: "Test",
          status: "Done",
          title: "Automated Tests",
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

      const filteredOutwardIssues = await filterOutwardIssues(
        outwardIssues,
        {}
      );
      expect(filteredOutwardIssues).not.toBeNull();
      _.each(filterOutwardIssues, (item) => {
        expect(item).toHaveProperty("issues");
        expect(item.issues).not.toBeNull();
        expect(item.issues.length).toBeGreaterThan(0);
        expect(item).toHaveProperty("issuesCount");
        expect(item.issuesCount).toBeEqual(item.issues.length);
        expect(item).toHaveProperty("title");
      });
      expect(
        _.some(filteredOutwardIssues, (some) => {
          return !_.isNull(some) && !_.isEmpty(some);
        })
      ).toBeTruthy();
    });
  });

  describe("The outward issues need to be transformed in a more concise form", () => {
    it("should be possible to perform filtering and only leave a title and the amount of issues according to that category", async () => {
      const jrrConfigIssues = [
        {
          type: "Story",
          title: "Stories",
          status: "Done",
        },
        {
          type: "Test",
          status: "Done",
          title: "Automated Tests",
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

      const filteredOutwardIssues = await filterOutwardIssues(
        outwardIssues,
        {}
      );
      const shrinkedData = shrinkToCountPerTitle(filteredOutwardIssues);
      expect(shrinkedData).not.toBeNull();
      expect(shrinkedData.length).toEqual(2);
      _.each(shrinkedData, (j) => {
        expect(j).toHaveProperty("title", j.issuesCount);
        expect(j).not.toHaveProperty("type");
        expect(j).not.toHaveProperty("status");
        expect(j).not.toHaveProperty("criteria");
        expect(j).not.toHaveProperty("issues");
      });
    });

    it("should be possible to present the transformed outward issues as a table", async () => {
      const consoleSpy = jest.spyOn(console, "log");

      const jrrConfigIssues = [
        {
          type: "Story",
          title: "Stories",
          status: "Done",
        },
        {
          type: "Test",
          status: "Done",
          title: "Automated Tests",
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

      const filteredOutwardIssues = await filterOutwardIssues(
        outwardIssues,
        {}
      );
      const shrinkedData = shrinkToCountPerTitle(filteredOutwardIssues);
      const table = printResultsInTable(shrinkedData);
      console.log(table);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Type             Amount\n---------------  ------\nStories          1     \nAutomated Tests  12    \n\n"
      );
    });
  });
});
