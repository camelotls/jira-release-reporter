/* eslint-disable no-use-before-define */
const _ = require('lodash');

const reducer = (issues, type, status) => takeKeys(filterByTypeAndStatus(issues, type, status));

const takeKeys = (from) => _.map(from, (item) => item.key);

const filterByTypeAndStatus = (issues, type, status) => {
  const issueMetadata = getIssueMetadata(issues);
  return _.filter(issueMetadata, (issue) => {
    if (status) {
      return (
        _.lowerCase(issue.fields.issuetype.name) === _.lowerCase(type)
        && _.lowerCase(issue.fields.status.name) === _.lowerCase(status)
      );
    }
    return _.lowerCase(issue.fields.issuetype.name) === _.lowerCase(type);
  });
};

const getIssueMetadata = (issues) => _.flatMap(issues, (issue) => issue.fields.issuelinks
  .filter((issueLink) => (
    issueLink.outwardIssue !== undefined
          || issueLink.inwardIssue !== undefined
  ))
  .map((issuelink) => issuelink.outwardIssue || issuelink.inwardIssue));

module.exports = { reducer, takeKeys };
