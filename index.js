const { readFileSync, existsSync } = require("fs");
const yaml = require("js-yaml");
const jrrMain = require("./jrr/jrrMain.js");

const configFile = "./jrrConfig.yaml";

if (!existsSync(configFile)) {
  const errorMessage = `Config file ${configFile} not found at the expected location (./)`;
  console.error(errorMessage);
  throw errorMessage;
}

const config = readFileSync(configFile, "utf-8");
if (!config) {
  const errorMessage = `Could not read config file ${configFile}`;
  console.error(errorMessage);
  throw errorMessage;
}

const jrrConfig = yaml.load(config);
if (!jrrConfig) {
  const errorMessage = `Could not parse YAML configuration`;
  console.error(errorMessage);
  throw errorMessage;
}
jrrMain(jrrConfig);
