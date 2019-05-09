'use strict';

const { intentBuilder } = require('./intent');

let bot = {};
const botModule = (function() {
  const app = {
    buildBot: (name, cb = null) => {
      if (!name) {
        throw 'Bot name can\'t be empty';
      }
      
      // TODO: add more fields to botModel
      const botModel = {
        name: '',
        intents: []
      };

      bot = {...botModel, name};

      if (cb) {
        cb(bot);
      }

      intentBuilder(bot);
      
      return bot;
    },

    showMeBot: () => {
      return bot;
    }
  };

  return app;
})();

module.exports = botModule;