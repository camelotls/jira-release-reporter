const axios = require('axios');

const instance = (baseURL) => ({
  get() {
    return axios.create({
      baseURL,
    });
  },
});

module.exports = instance;
