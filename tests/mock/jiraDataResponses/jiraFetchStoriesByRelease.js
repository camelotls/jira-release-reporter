module.exports = {
  expand: 'schema,names',
  startAt: 0,
  maxResults: 50,
  total: 120,
  issues: [
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '352075',
      self: 'https://jira.camelot.global/rest/api/2/issue/352075',
      key: 'DIG-28092',
      fields: {
        issuelinks: [
          {
            id: '340533',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/340533',
            type: {
              id: '10002',
              name: 'Duplicate',
              inward: 'is duplicated by',
              outward: 'duplicates',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10002',
            },
            outwardIssue: {
              id: '344322',
              key: 'DIG-27539',
              self: 'https://jira.camelot.global/rest/api/2/issue/344322',
              fields: {
                summary: 'Add Card Result page: Successful/Unsuccessful cases',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self: 'https://jira.camelot.global/rest/api/2/issuetype/7',
                  id: '7',
                  description:
                    'Created by Jira Software - do not edit or delete. Issue type for a user story.',
                  iconUrl:
                    'https://jira.camelot.global/secure/viewavatar?size=xsmall&avatarId=11815&avatarType=issuetype',
                  name: 'Story',
                  subtask: false,
                  avatarId: 11815,
                },
              },
            },
          },
          {
            id: '339246',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339246',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            inwardIssue: {
              id: '353128',
              key: 'DIG-28218',
              self: 'https://jira.camelot.global/rest/api/2/issue/353128',
              fields: {
                summary: 'DIG-28092 - Scenario 1 - Add Card through My Account',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '339247',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339247',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            inwardIssue: {
              id: '353129',
              key: 'DIG-28219',
              self: 'https://jira.camelot.global/rest/api/2/issue/353129',
              fields: {
                summary:
                  'DIG-28092 - Scenario 2 - Edit Card through My Account',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '339248',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339248',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            inwardIssue: {
              id: '353130',
              key: 'DIG-28220',
              self: 'https://jira.camelot.global/rest/api/2/issue/353130',
              fields: {
                summary:
                  'DIG-28092 - Scenario 3 - Add Card through My Account DBG Journey',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '339249',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339249',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            inwardIssue: {
              id: '353131',
              key: 'DIG-28221',
              self: 'https://jira.camelot.global/rest/api/2/issue/353131',
              fields: {
                summary:
                  'DIG-28092 - Scenario 4 - Add Card through My Account IWG Journey',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '339250',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339250',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            inwardIssue: {
              id: '353132',
              key: 'DIG-28222',
              self: 'https://jira.camelot.global/rest/api/2/issue/353132',
              fields: {
                summary:
                  'DIG-28092 - Scenario 5 - No cancel link in the registration journey',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
        ],
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '354415',
      self: 'https://jira.camelot.global/rest/api/2/issue/354415',
      key: 'DIG-28374',
      fields: {
        issuelinks: [
          {
            id: '340611',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/340611',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '355252',
              key: 'DIG-28452',
              self: 'https://jira.camelot.global/rest/api/2/issue/355252',
              fields: {
                summary:
                  'DIG-28374: Cannot initiate add HCG payment card when USE_WORLDPAY_AWP_FOR_ADD_CARD is enabled',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '340613',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/340613',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '355254',
              key: 'DIG-28454',
              self: 'https://jira.camelot.global/rest/api/2/issue/355254',
              fields: {
                summary:
                  'DIG-28374: Cannot finalise add HCG payment card when USE_WORLDPAY_AWP_FOR_ADD_CARD is enabled',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '340614',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/340614',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '355255',
              key: 'DIG-28455',
              self: 'https://jira.camelot.global/rest/api/2/issue/355255',
              fields: {
                summary:
                  'DIG-28374: Cannot initiate add AWP payment card when USE_WORLDPAY_AWP_FOR_ADD_CARD is disabled',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '340615',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/340615',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '355256',
              key: 'DIG-28456',
              self: 'https://jira.camelot.global/rest/api/2/issue/355256',
              fields: {
                summary:
                  'DIG-28374: Cannot finalise add AWP payment card when USE_WORLDPAY_AWP_FOR_ADD_CARD is disabled',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
        ],
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '353852',
      self: 'https://jira.camelot.global/rest/api/2/issue/353852',
      key: 'DIG-28289',
      fields: {
        issuelinks: [
          {
            id: '339860',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339860',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '354066',
              key: 'DIG-28318',
              self: 'https://jira.camelot.global/rest/api/2/issue/354066',
              fields: {
                summary:
                  'DIG-28289: Failed Add Card Event - Less than 24h from the previous change error',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '339861',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339861',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '354070',
              key: 'DIG-28319',
              self: 'https://jira.camelot.global/rest/api/2/issue/354070',
              fields: {
                summary:
                  'DIG-28289: Failed Add/edit Card Event - balance higher than max allowed balance',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '339862',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339862',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '354073',
              key: 'DIG-28320',
              self: 'https://jira.camelot.global/rest/api/2/issue/354073',
              fields: {
                summary: 'DIG-28289: Unclaimed DBG prize',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '339863',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339863',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '354077',
              key: 'DIG-28321',
              self: 'https://jira.camelot.global/rest/api/2/issue/354077',
              fields: {
                summary: 'DIG-28289: Unclaimed IWG prize',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '339864',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339864',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '354080',
              key: 'DIG-28322',
              self: 'https://jira.camelot.global/rest/api/2/issue/354080',
              fields: {
                summary:
                  'DIG-28289:  >£52 worth of tickets entered into future draws',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '339865',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339865',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '354081',
              key: 'DIG-28323',
              self: 'https://jira.camelot.global/rest/api/2/issue/354081',
              fields: {
                summary: 'DIG-28289: Unfinished IWG',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
          {
            id: '340173',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/340173',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '354461',
              key: 'DIG-28380',
              self: 'https://jira.camelot.global/rest/api/2/issue/354461',
              fields: {
                summary: 'DIG-28289 Funds and Payments disabled',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
        ],
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '352793',
      self: 'https://jira.camelot.global/rest/api/2/issue/352793',
      key: 'DIG-28114',
      fields: {
        issuelinks: [
          {
            id: '339781',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/339781',
            type: {
              id: '10003',
              name: 'Relate',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10003',
            },
            outwardIssue: {
              id: '353976',
              key: 'DIG-28293',
              self: 'https://jira.camelot.global/rest/api/2/issue/353976',
              fields: {
                summary:
                  'DIG-28114 First 4 digits of debit card masked in Database',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/10300',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/trivial.svg',
                  name: 'Undefined',
                  id: '10300',
                },
                issuetype: {
                  self:
                    'https://jira.camelot.global/rest/api/2/issuetype/10400',
                  id: '10400',
                  description:
                    'This Issue Type is used to create Zephyr Test within Jira.',
                  iconUrl:
                    'https://jira.camelot.global/download/resources/com.thed.zephyr.je/images/icons/ico_zephyr_issuetype.png',
                  name: 'Test',
                  subtask: false,
                },
              },
            },
          },
        ],
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '359408',
      self: 'https://jira.camelot.global/rest/api/2/issue/359408',
      key: 'DIG-29284',
      fields: {
        issuelinks: [
          {
            id: '343694',
            self: 'https://jira.camelot.global/rest/api/2/issueLink/343694',
            type: {
              id: '10600',
              name: 'Problem/Incident',
              inward: 'is caused by',
              outward: 'causes',
              self:
                'https://jira.camelot.global/rest/api/2/issueLinkType/10600',
            },
            inwardIssue: {
              id: '359148',
              key: 'DIG-29277',
              self: 'https://jira.camelot.global/rest/api/2/issue/359148',
              fields: {
                summary: 'CUK Load Testing R56 - Lock timeouts',
                status: {
                  self: 'https://jira.camelot.global/rest/api/2/status/10004',
                  description: 'Done',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/statuses/closed.png',
                  name: 'Done',
                  id: '10004',
                  statusCategory: {
                    self:
                      'https://jira.camelot.global/rest/api/2/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self: 'https://jira.camelot.global/rest/api/2/priority/2',
                  iconUrl:
                    'https://jira.camelot.global/images/icons/priorities/critical.svg',
                  name: 'P2',
                  id: '2',
                },
                issuetype: {
                  self: 'https://jira.camelot.global/rest/api/2/issuetype/1',
                  id: '1',
                  description:
                    'A problem which impairs or prevents the functions of the product.',
                  iconUrl:
                    'https://jira.camelot.global/secure/viewavatar?size=xsmall&avatarId=11803&avatarType=issuetype',
                  name: 'Bug',
                  subtask: false,
                  avatarId: 11803,
                },
              },
            },
          },
        ],
      },
    },
  ],
};
