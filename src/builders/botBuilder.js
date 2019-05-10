const intentBuilder = require('./intentBuilder');
const { buildBot } = require('../modules/bot');
const FileHelper = require('../helpers/fileHelper');
const configuration = require('../config');

let config = null;
(async () => {
  config = await configuration();
})();

const runBuild = async chatbotName => {
  // run the intentBuilder script
  await intentBuilder.runBuild();
  const myBot = chatbotName || config.defaultChatbotName;
  const chatbot = buildBot(myBot, null);
  await writeToFile(chatbot, myBot);

  return chatbot;
};

const writeToFile = async (data, filename) => {
  const fileHelper = new FileHelper();
  const exportDirectory = config.botDefinitionExportPath;

  await fileHelper.writeToFile(data, exportDirectory, filename);
};

module.exports = {
  runBuild
};
