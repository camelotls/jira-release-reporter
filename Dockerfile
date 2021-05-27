FROM node:15

ENV project=''
ENV release=''
ENV jiraUser=''
ENV jiraPass=''
ENV jiraBaseURL=''
ENV format=''

WORKDIR /jira-release-reporter/bin
RUN mkdir /jira-release-reporter/bin/report

COPY ./jrrConfig.template.yaml jrrConfig.yaml
COPY ./dist/index.js index.js
COPY ./jrr/renderers/html/template.html ./jrr/renderers/html/template.html


CMD ["sh", "-c", "node index.js --project=\"${project}\" --release=\"${release}\" --jiraBaseURL=\"${jiraBaseURL}\" --jiraUser=\"${jiraUser}\" --jiraPass=\"${jiraPass}\" --format=\"${format}\""]