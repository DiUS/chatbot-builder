const vm = require('vm');
const { withIntent, utterance, utterances, utteranceWithPattern, responseMessage } = require('../modules').intentModule;
const FileHelper = require('../helpers/fileHelper');

const runBuild = async () => {
  const allIntents = [];
  const fileHelper = new FileHelper();
  const configJSON = await fileHelper.readFileFromPath('.exchatrc'); // TODO: better to set absolute path later
  const config = JSON.parse(configJSON);
  const intentFilesDirectory = `${config.intentsPath}/${config.intentsFileExtension}`; 
  const intentsData = await fileHelper.loadFilesFromDirectory(intentFilesDirectory);

  for (let intentData of intentsData) {
    const { data } = intentData;

    /* This code requires to set up node.js vm runtime sandbox */
    const sandbox = {
      withIntent,
      utterance,
      utterances,
      utteranceWithPattern,
      responseMessage,
    };
    
    try {
      const intentScript = new vm.Script(data);
      const context = vm.createContext(sandbox);
      const loadedIntent = intentScript.runInContext(context);
      allIntents.push(loadedIntent);
    } catch (error) {
      throw new Error(error);
    }
  }

  return allIntents;
};

module.exports = {
  runBuild
};
