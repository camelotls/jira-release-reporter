const _ = require("lodash");

const reducer = (issues, type, status) => {
  return takeKeys(filterByTypeAndStatus(issues, type, status));
};

const takeKeys = (fromArray) => {
  return _.map(fromArray, (item) => {
    return item.key;
  });
};

const filterByTypeAndStatus = (issues, type, status) => {
  const outwardIssues = filterOutwardIssues(issues);
  return _.filter(outwardIssues, (outwardIssue) => {
    return (
      _.lowerCase(outwardIssue.fields.issuetype.name) === _.lowerCase(type) &&
      _.lowerCase(outwardIssue.fields.status.name) === _.lowerCase(status)
    );
  });
};

const filterOutwardIssues = (issues) => {
  return _.flatMap(issues, (issue) => {
    return issue.fields.issuelinks
      .filter((issueLink) => {
        return issueLink["outwardIssue"] !== undefined;
      })
      .map((issuelink) => issuelink.outwardIssue);
  });
};

module.exports = { reducer, takeKeys };
