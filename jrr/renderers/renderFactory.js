const HTMLRenderer = require('./html/htmlRenderer');

const renderer = { html: HTMLRenderer };

const createRenderer = (type) => {
  const RendererType = renderer[type];

  return new RendererType();
};

module.exports = createRenderer;
