const _ = require("lodash");

const reducer = (issues, type, status) => {
  return takeKeys(filterByTypeAndStatus(issues, type, status));
};

const takeKeys = (from) => {
  return _.map(from, (item) => {
    return item.key;
  });
};

const filterByTypeAndStatus = (issues, type, status) => {
  const issueMetadata = getIssueMetadata(issues);
  return _.filter(issueMetadata, (issue) => {
    if (status) {
      return (
        _.lowerCase(issue.fields.issuetype.name) === _.lowerCase(type) &&
        _.lowerCase(issue.fields.status.name) === _.lowerCase(status)
      );
    }
    return _.lowerCase(issue.fields.issuetype.name) === _.lowerCase(type)
  });
};

const getIssueMetadata = (issues) => {
  return _.flatMap(issues, (issue) => {
    return issue.fields.issuelinks
      .filter((issueLink) => {
        return (
          issueLink["outwardIssue"] !== undefined ||
          issueLink["inwardIssue"] !== undefined
        );
      })
      .map((issuelink) => issuelink.outwardIssue || issuelink.inwardIssue);
  });
};

module.exports = { reducer, takeKeys };
