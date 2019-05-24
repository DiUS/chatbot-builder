const FileHelper = require('../helpers/fileHelper');

const configuration = async () => {
  let config = {};

  try {
    const fileHelper = new FileHelper();
    const configJSON = await fileHelper.readFileFromPath('.exchatrc');
    config = JSON.parse(configJSON);
  } catch (error) {
    throw 'The configuration file is not found, please create .exchatrc in the root folder.';
  }
  
  return config;
};

module.exports = configuration;
