FROM node:15.11.0-alpine3.10

ENV project=''
ENV release=''

COPY ./jrrConfig.yaml .
COPY ./dist/index.js .

CMD ["sh", "-c", "node index.js --project=\"${project}\" --release=\"${release}\""]