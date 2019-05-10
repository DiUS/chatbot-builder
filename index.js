const intentBuilder = require('./src/builders/intentBuilder');

// run the intentBuilder script
(async() => {
  const intents = await intentBuilder.runBuild();
  console.log('intents: ', intents);
})();
