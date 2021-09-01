const Handlebars = require('handlebars');
const fs = require('fs');

const readTemplate = () => fs.readFileSync('./jrr/renderers/html/template.html', 'utf-8');

const renderHTML = (args) => {
  const templateFile = readTemplate();
  const template = Handlebars.compile(templateFile);
  const html = template(args);
  return {
    filename: 'out.html',
    content: html,
  };
};

const HTMLRenderer = function () {
  return {
    render: renderHTML,
  };
};

module.exports = HTMLRenderer;
