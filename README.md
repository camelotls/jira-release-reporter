# JIRA Release Reporter
---
## Intro
This piece of software makes use of the [Jira Server REST API v8.4.3](https://docs.atlassian.com/software/jira/docs/api/REST/8.4.3/) in order to retrieve statistical information about issues and their status within a particular release. The desired information can be formulated in a declarative way in the _jrrConfig.yaml_ file which is picked up at runtime and translated into [JQL](https://www.atlassian.com/blog/jira-software/jql-the-most-flexible-way-to-search-jira-14) which then is executed on the configured JIRA instance (_also jrrConfig.yaml_) via the REST API.

## Configuration
The repo contains a file called [_jrrConfig.template.yaml_](https://github.com/camelotls/jira-release-reporter/blob/DIG32594/jrrConfig.template.yaml) which servers as a template to copy-rename into the (_expected_) filename _jrrConfig.yaml_). This is done since access credentials for JIRA are necessary to be configured and thus to avoid those to be accidentally committed and pushed to origin. The _jrrConfig.yaml_ is excluded via [_.gitignore_](https://github.com/camelotls/jira-release-reporter/blob/DIG32594/.gitignore) so there's no danger of having sensitive information exposed easily by mistake.

The contents of the configuration file are more or less easy to understand.
Let's have a looksy
```
jira:
  jiraBaseURL: https://your.jira.instance/rest
  jiraUser: jiraUser
  jiraPass: jiraPassword
project: DIG
releaseVersion: Release 58
issues:
  - type: Test
    status: Done
    title: "Automated Tests"
    criteria:
      Automation Candidate: "yes"
      Test Type: Automated
  - type: Story
    status: Done
    title: "Stories"
  - type: Bug
    status: Open
    title: "Known issues"
```
The first section hosts information about the actual JIRA access, followed by information about the project to retrieve the stats for as well as the release version.
The meat and potatoes is the `issues` section, which is a list of the types of issues we might like to gain some insights (_perhaps for KPI reporting_ ;) ). In the example we'd like to know the numbers of Tests that have been automated within the given release, as well as the completed stories and what the number of the known issues is.

## How to run

### NodeJS
After setting the config file _jrrConfig.yaml_ up and adjusting the parameters according to our needs, simply execute via command line.
```
node index.js
```
After a few moments you should see the results printed on the terminal. The output should more or less look like the following.
```
Type             Amount
---------------  ------
Known issues     0     
Stories          2     
Automated Tests  16 
```

You also can pass a different project and release version to the ones available in the config file by passing the appropriate parameters.
```
node index.js --project=DIG --release='Release 59'
```

### Docker
You can create an image by simply executing `npm run dist` in the project's root directory. An image with the (_default_) tag `docker.artifactory.camelot.global/jira-release-reporter:0.1.0` will be created. You can afterwards run `docker run` for the created image to run the jira release reporter. The output will be printed on stdout. Hint: please consider adding the `--rm` flag in order to immediately remove the container after execution.
In case you'd like to provide the project and the release version as arguments, you can do so by passing them as environment arguments to the `docker run` command.
```
docker run -e project=DIG -e release='Release 59' docker.artifactory.camelot.global/jira-release-reporter:0.1.0
```


## Tests, Tests, Tests
There's a decent amount of unit tests (and beyond) included. Those can be executed via
```
npm test
```
