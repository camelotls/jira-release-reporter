FROM node:15.11.0-alpine3.10

ENV project=''
ENV release=''
ENV jiraUser=''
ENV jiraPass=''
ENV format = ''

WORKDIR /jrr/bin

COPY ./jrrConfig.template.yaml ./jrrConfig.yaml
COPY ./dist/index.js .

CMD ["sh", "-c", "node index.js --project=\"${project}\" --release=\"${release}\" --jiraUser=\"${jiraUser}\" --jiraPass=\"${jiraPass}\" --format=\"${format}\""]