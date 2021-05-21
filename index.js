/* eslint-disable no-console */
const { readFileSync, existsSync } = require('fs');
const yaml = require('js-yaml');
const yargs = require('yargs');
const jrrMain = require('./jrr/jrrMain.js');

const configFile = './jrrConfig.yaml';

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

const options = yargs.usage('Usage: -p <JIRA Project ID> -r <Release Name>').option('p', {
  alias: 'project', describe: 'The project ID as maintained in JIRA', type: 'string', demandOption: false,
}).option('r', {
  alias: 'release', describe: 'The release version to retrieve information for', type: 'string', demandOption: false,
}).argv;

const {
  project, release, jiraUser, jiraPass, format,
} = options;

if (project) {
  jrrConfig.project = project;
}
if (release) {
  jrrConfig.releaseVersion = release;
}
if (jiraUser) {
  jrrConfig.jiraUser = jiraUser;
}
if (jiraPass) {
  jrrConfig.jiraPass = jiraPass;
}
if (format) {
  jrrConfig.format = format;
}

jrrMain(jrrConfig);
