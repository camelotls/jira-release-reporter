const rewire = require("rewire");
const issuesFromJiraAPI = require("./mock/jiraDataResponses/jiraFetchStoriesByRelease")
  .issues;
const jrrMain = rewire("../jrr/jrrMain");
const takeOutwardIssues = jrrMain.__get__("takeOutwardIssues");
const _ = require("lodash");

describe("JIRA Release Reporter Main function", () => {
  describe("When taking the outward issues only for Test issues which are Done", () => {
    it("the results should only be of type Test with status Done", () => {
      const jrrConfigIssues = [
        {
          type: "Test",
          status: "Done",
        },
      ];
      const outwardIssues = takeOutwardIssues(
        jrrConfigIssues,
        issuesFromJiraAPI
      );
      expect(outwardIssues).not.toBeNull();
      expect(outwardIssues).toHaveLength(12);
      outwardIssues.map((outwardIssue) => {
        expect(outwardIssue.fields).not.toBeNull();
        expect(outwardIssue.key).not.toBeNull();
        expect(outwardIssue.fields.status.name).toEqual("Done");
        expect(outwardIssue.fields.issuetype.name).toEqual("Test");
      });
    });

    describe("When taking the outward issues only for Story which are Done", () => {
      it("the results should only be of type Story and status Done", () => {
        const jrrConfigIssues = [
          {
            type: "Story",
            status: "Done",
          },
        ];
        const outwardIssues = takeOutwardIssues(
          jrrConfigIssues,
          issuesFromJiraAPI
        );
        expect(outwardIssues).not.toBeNull();
        expect(outwardIssues).toHaveLength(1);
        outwardIssues.map((outwardIssue) => {
          expect(outwardIssue.fields).not.toBeNull();
          expect(outwardIssue.key).not.toBeNull();
          expect(outwardIssue.fields.status.name).toEqual("Done");
          expect(outwardIssue.fields.issuetype.name).toEqual("Story");
        });
      });
    });

    describe("When taking the outward issues for both Story and Test which are Done", () => {
      it("there should be outward issues for Story as well for Test types", () => {
        const jrrConfigIssues = [
          {
            type: "Story",
            status: "Done",
          },
          {
            type: "Test",
            status: "Done",
          },
        ];
        const outwardIssues = takeOutwardIssues(
          jrrConfigIssues,
          issuesFromJiraAPI
        );
        expect(outwardIssues).not.toBeNull();
        expect(outwardIssues).toHaveLength(13);

        const stories = _.filter(outwardIssues, (outwardIssue) => {
          return outwardIssue.fields.issuetype.name === "Story";
        });

        const tests = _.filter(outwardIssues, (outwardIssue) => {
          return outwardIssue.fields.issuetype.name === "Test";
        });

        expect(stories).toHaveLength(1);
        expect(tests).toHaveLength(12);
      });
    });
  });
});
