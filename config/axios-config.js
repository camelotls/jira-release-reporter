const axios = require("axios");

const instance = (baseURL) => {
  return {
    get: function () {
      return axios.create({
        baseURL: baseURL,
      });
    },
  };
};

module.exports = instance;
