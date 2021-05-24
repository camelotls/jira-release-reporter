const fs = require('fs');

const write = (filename, content) => {
  fs.mkdirSync('/jira-release-reporter/report');
  fs.writeFile(filename, content, (err) => {
    err ? console.log(err) : null;
  });
};

module.exports = write;
