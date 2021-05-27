/* eslint-disable no-console */
const { readFileSync, existsSync } = require('fs');
const yaml = require('js-yaml');
const { demandOption } = require('yargs');
const yargs = require('yargs');
const jrrMain = require('./jrr/jrrMain.js');

const configFile = './jrrConfig.yaml';

const options = yargs.usage('Usage: -p <JIRA Project ID> -r <Release Name> -conf <Custom Config>').option('p', {
  alias: 'project', describe: 'The project ID as maintained in JIRA', type: 'string', demandOption: false,
}).option('r', {
  alias: 'release', describe: 'The release version to retrieve information for', type: 'string', demandOption: false,
}).option('conf', {
  alias: 'alternative configuration', describe: 'An optional external configuration to override the internal one', type: 'string', demandOption: false,
}).argv;

const {
  project, release, jiraUser, jiraPass, jiraBaseURL, format, conf,
} = options;

if (!conf && !existsSync(configFile)) {
  const errorMessage = `Config file ${configFile} not found at the expected location (./)`;
  console.error(errorMessage);
  throw errorMessage;
}

const config = conf || readFileSync(configFile, 'utf-8');
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

if (project) {
  jrrConfig.project = project;
}
if (release) {
  jrrConfig.releaseVersion = release;
}
if (jiraUser) {
  jrrConfig.jira.jiraUser = jiraUser;
}
if (jiraPass) {
  jrrConfig.jira.jiraPass = jiraPass;
}
if (jiraBaseURL) {
  jrrConfig.jira.jiraBaseURL = jiraBaseURL;
}
if (format) {
  jrrConfig.format = format;
}

jrrMain(jrrConfig);
