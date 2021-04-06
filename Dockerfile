FROM node:15.11.0-alpine3.10

COPY ./jrrConfig.yaml .
COPY ./dist/index.js .

CMD ["node", "index.js"]