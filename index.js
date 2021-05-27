/* eslint-disable no-console */
const { readFileSync, existsSync } = require('fs');
const yaml = require('js-yaml');
const { demandOption } = require('yargs');
const yargs = require('yargs');
const jrrMain = require('./jrr/jrrMain.js');

const configFile = './jrrConfig.yaml';

const resolveByPreference = (preference, theDefault) => preference || theDefault;

const options = yargs.usage('Usage: -p <JIRA Project ID> -r <Release Name> -conf <Custom Config>').option('p', {
  alias: 'project', describe: 'The project ID as maintained in JIRA', type: 'string', demandOption: false,
}).option('r', {
  alias: 'release', describe: 'The release version to retrieve information for', type: 'string', demandOption: false,
}).argv;

const {
  project, release, jiraUser, jiraPass, jiraBaseURL, format,
} = options;

if (!existsSync(configFile)) {
  const errorMessage = `Config file ${configFile} not found at the expected location (./)`;
  console.error(errorMessage);
  throw errorMessage;
}

const config = readFileSync(configFile, 'utf-8');
if (!config) {
  const errorMessage = `Could not read config file ${configFile}`;
  console.error(errorMessage);
  throw errorMessage;
}

const jrrConfig = yaml.load(config);
if (!jrrConfig) {
  const errorMessage = 'Could not parse YAML configuration';
  console.error(errorMessage);
  throw errorMessage;
}

if (!jrrConfig.jira) {
  jrrConfig.jira = {};
}

jrrConfig.project = resolveByPreference(project, jrrConfig.project);

jrrConfig.releaseVersion = resolveByPreference(release, jrrConfig.releaseVersion);

jrrConfig.jira.jiraUser = resolveByPreference(jiraUser, jrrConfig.jira.jiraUser);

jrrConfig.jira.jiraPass = resolveByPreference(jiraPass, jrrConfig.jira.jiraPass);

jrrConfig.jira.jiraBaseURL = resolveByPreference(jiraBaseURL, jrrConfig.jira.jiraBaseURL);

jrrConfig.format = resolveByPreference(format, jrrConfig.format);

jrrMain(jrrConfig);
