'use strict';

const { intentBuilder } = require('./intent');

let bot = {};
const botModule = (function() {
  const app = {
    buildBot: (name, cb = null) => {
      if (!name) {
        throw new Error('Bot name can\'t be empty');
      }
      
      // TODO: add more fields to botModel
      const botModel = {
        name: '',
        intents: []
      };

      bot = {...botModel, name};

      if (cb) {
        cb();
      }

      intentBuilder(bot);
      
      return bot;
    }
  };

  return app;
})();

module.exports = botModule;