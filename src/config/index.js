const FileHelper = require('../helpers/fileHelper');

const configuration = async () => {
  const fileHelper = new FileHelper();
  const configJSON = await fileHelper.readFileFromPath('.exchatrc');
  const config = JSON.parse(configJSON);

  return config;
};

module.exports = configuration;