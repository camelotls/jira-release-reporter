const HTMLRenderer = require('./html/htmlRenderer');

const renderer = { html: HTMLRenderer };

const createRenderer = (type, args) => {
  const RendererType = renderer[type];

  return new RendererType(args);
};

module.exports = createRenderer;
