const fs = require('fs');

const write = (filename, content) => {
  fs.writeFile(filename, content, (err) => {
    err ? console.log(err) : null;
  });
};

module.exports = write;
