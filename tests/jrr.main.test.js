/* eslint-disable no-underscore-dangle */
const rewire = require('rewire');
const _ = require('lodash');
const issuesFromJiraAPI = require('./mock/jiraDataResponses/jiraFetchStoriesByRelease')
  .issues;

const jrrMain = rewire('../jrr/jrrMain');
const takeIssues = jrrMain.__get__('takeIssues');
const filterIssues = jrrMain.__get__('filterIssues');
const shrinkToCountPerTitleAndDetails = jrrMain.__get__('shrinkToCountPerTitleAndDetails');
const printResultsInTable = jrrMain.__get__('printResultsInTable');
const fetchAutomatedTests = require('./mock/jiraDataResponses/jiraFetchAutomatedTests');

jrrMain.__set__('filterByCriteriaAndKeys', async () => fetchAutomatedTests);

describe('JIRA Release Reporter Main function', () => {
  describe('When having several types of issues', () => {
    it('should return a collection containing both types with the according status as outward issues to the parent story', () => {
      const jrrConfigIssues = [
        {
          type: 'Story',
          status: 'Done',
          title: 'Stories Done',
        },
        {
          type: 'Test',
          status: 'Done',
          title: 'Automated Tests',
          criteria: {
            'Automation Type': 'yes',
            'Test Type': 'Automated',
          },
        },
      ];
      const issues = takeIssues(jrrConfigIssues, issuesFromJiraAPI);
      expect(issues).not.toBeNull();
      expect(issues).toHaveLength(2);

      const stories = _.filter(issues, (issue) => issue.type === 'Story')[0];

      const tests = _.filter(issues, (issue) => issue.type === 'Test')[0];

      expect(stories.issues).toHaveLength(1);
      expect(tests.issues).toHaveLength(17);

      expect(tests.criteria).toEqual(jrrConfigIssues[1].criteria);
    });
  });

  describe('When filtering out the outward issues by applying the configured criteria', () => {
    it('should return the filtered values without any errors', async () => {
      const jrrConfigIssues = [
        {
          type: 'Story',
          title: 'Stories',
          status: 'Done',
        },
        {
          type: 'Test',
          status: 'Done',
          title: 'Automated Tests',
          criteria: {
            'Automation Type': 'yes',
            'Test Type': 'Automated',
          },
        },
      ];
      const issues = takeIssues(jrrConfigIssues, issuesFromJiraAPI);
      expect(issues).not.toBeNull();
      expect(issues).toHaveLength(2);

      const filteredissues = await filterIssues(_, issues, {});
      expect(filteredissues).not.toBeNull();
      _.each(filterIssues, (item) => {
        expect(item).toHaveProperty('issues');
        expect(item.issues).not.toBeNull();
        expect(item.issues.length).toBeGreaterThan(0);
        expect(item).toHaveProperty('issuesCount');
        expect(item.issuesCount).toBeEqual(item.issues.length);
        expect(item).toHaveProperty('title');
      });
      expect(
        _.some(filteredissues, (some) => !_.isNull(some) && !_.isEmpty(some)),
      ).toBeTruthy();
    });
  });

  describe('The outward issues need to be transformed in a more concise form', () => {
    it('should be possible to perform filtering and only leave a title and the amount of issues according to that category', async () => {
      const jrrConfigIssues = [
        {
          type: 'Story',
          title: 'Stories',
          status: 'Done',
        },
        {
          type: 'Test',
          status: 'Done',
          title: 'Automated Tests',
          criteria: {
            'Automation Type': 'yes',
            'Test Type': 'Automated',
          },
        },
      ];
      const issues = takeIssues(jrrConfigIssues, issuesFromJiraAPI);
      expect(issues).not.toBeNull();
      expect(issues).toHaveLength(2);

      const filteredissues = await filterIssues(_, issues, {});
      const shrinkedData = shrinkToCountPerTitleAndDetails(filteredissues, 'https://jira.mock.test');
      expect(shrinkedData).not.toBeNull();
      expect(shrinkedData.overview.length).toEqual(2);
      _.each(shrinkedData, (j) => {
        expect(j).toHaveProperty('title', j.issuesCount);
        expect(j).not.toHaveProperty('type');
        expect(j).not.toHaveProperty('status');
        expect(j).not.toHaveProperty('criteria');
        expect(j).not.toHaveProperty('issues');
      });
    });

    it('should be possible to present the transformed outward issues as a table', async () => {
      const consoleSpy = jest.spyOn(console, 'log');

      const jrrConfigIssues = [
        {
          type: 'Story',
          title: 'Stories',
          status: 'Done',
        },
        {
          type: 'Test',
          status: 'Done',
          title: 'Automated Tests',
          criteria: {
            'Automation Type': 'yes',
            'Test Type': 'Automated',
          },
        },
      ];
      const issues = takeIssues(jrrConfigIssues, issuesFromJiraAPI);
      expect(issues).not.toBeNull();
      expect(issues).toHaveLength(2);

      const filteredissues = await filterIssues(_, issues, {});
      const shrinkedData = shrinkToCountPerTitleAndDetails(filteredissues, 'https://jira.mock.test');
      const table = printResultsInTable(shrinkedData.overview);
      console.log(table);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Type             Amount\n---------------  ------\nStories          1     \nAutomated Tests  5     \n\n',
      );
    });
  });
});
