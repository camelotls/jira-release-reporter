/* eslint-disable no-restricted-syntax */
const _ = require('lodash');
const api = require('../../api/jiraApiClient');

const getUniqueCriteria = (fromObject) => {
  const allCriteria = _.map(fromObject, (item) => item.criteria && Object.keys(item.criteria));
  const filteredCriteria = _.filter(allCriteria, (item) => !_.isNil(item));
  return new Set(_.flattenDeep(filteredCriteria));
};

const metaFieldsPredicateClosure = (metaFieldsFromCriteria) => function (jiraField) {
  return metaFieldsFromCriteria.has(jiraField.name);
};

const handleMetaFields = async (metaFieldsFromCriteria, axiosInstance, jiraAuthHeaders) => {
  const allFields = await api.getAllFields(axiosInstance, jiraAuthHeaders);
  const usedFieldsMeta = _.filter(allFields, metaFieldsPredicateClosure(metaFieldsFromCriteria));
  return _.map(usedFieldsMeta, (meta) => ({ id: meta.id, field: meta.name }));
};

const resolveFieldValue = (field) => {
  if (field.constructor === Array) {
    return field[0].value;
  }
  return field.value;
};

const metaFieldIssueMatch = (metaFields, issueFields) => {
  const matches = [];
  for (const metaField of metaFields) {
    if (metaField.id in issueFields) {
      matches.push(`${metaField.field} : ${issueFields[metaField.id] ? resolveFieldValue(issueFields[metaField.id]) : 'null'}`);
    }
  }
  return matches;
};

const getAllIssues = async (axiosInstance, jiraAuthHeaders, allTheseMissingIssues, metaFields) => {
  const missingIssues = [...allTheseMissingIssues];
  for (const [index, missingIssue] of missingIssues.entries()) {
    // eslint-disable-next-line no-await-in-loop
    const issue = await api.getThisIssue(axiosInstance, jiraAuthHeaders, missingIssue.api);
    missingIssues[index].tags = metaFieldIssueMatch(metaFields, issue.fields);
  }
  return missingIssues;
};

module.exports = {
  getUniqueCriteria,
  handleMetaFields,
  getAllIssues,
};
