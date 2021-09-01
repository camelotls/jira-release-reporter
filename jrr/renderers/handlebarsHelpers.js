const Handlebars = require('handlebars');

const registerHandlebarsHelpers = () => {
  Handlebars.registerHelper('greaterThanZero', function (u, options) {
    if (u > 0) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
};

module.exports = { registerHandlebarsHelpers };
