const vm = require('vm');
const { withIntent, utterance, utterances, utteranceWithPattern, responseMessage, responseCard } = require('../modules').intentModule;
const FileHelper = require('../helpers/fileHelper');
const configuration = require('../config');

const runBuild = async () => {
  const allIntents = [];
  const config = await configuration();

  const fileHelper = new FileHelper();
  const intentFilesDirectory = `${config.intentsPath}/${config.intentsFileExtension}`; 
  const intentsData = await fileHelper.loadFilesFromDirectory(intentFilesDirectory);

  /* This code requires to set up node.js vm runtime sandbox */
  const sandbox = {
    withIntent,
    utterance,
    utterances,
    utteranceWithPattern,
    responseMessage,
    responseCard
  };

  for (let intentData of intentsData) {
    const { data } = intentData;
    
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
