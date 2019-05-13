'use strict';

const intentUtteranceExpander = require('intent-utterance-expander');
const allIntents = [];

const intentModule = (function() {
  let intent = null;
  
  const app = {
    intentBuilder: bot => {
      bot.intents = allIntents;
    },

    withIntent: (name, cb = null) => {
      if (!name) {
        throw new Error('Intent name can\'t be empty');
      }

      // TODO: It is better to load model from external
      const intentModel = {
        description: '',
        name: '',
        fulfillmentActivity: { type: 'ReturnIntent' },
        sampleUtterances: [],
        slots: [],
        conclusionStatement: { messages: [] }
      };

      intent = {...intentModel, name};

      if (cb) {
        cb();
      }

      allIntents.push(intent);

      return intent;
    },

    utterance: str => {
      if (!str) {
        throw new Error('Utterance can\'t be empty');
      }

      if (intent.sampleUtterances && !intent.sampleUtterances.indexOf(str) > -1) {
        intent.sampleUtterances.push(str);
      }
    },

    utterances: arr => {
      if (!Array.isArray(arr)) {
        throw new Error('Your input needs to be a valid array');
      }

      if (intent.sampleUtterances) {
        const s = new Set([...intent.sampleUtterances, ...arr]);
        intent.sampleUtterances = [...s];
      }
    },

    // should match the pattern in this way "(hi|hello), world!"
    utteranceWithPattern: (pattern) => {
      const matchedResults = intentUtteranceExpander(pattern);
      app.utterances(matchedResults);
    },

    responseMessage: (response, groupNumber = 1) => {
      if (!response) {
        throw new Error('Your response can\'t be empty');
      }

      if (intent.conclusionStatement && intent.conclusionStatement.messages) {
        const { messages } = intent.conclusionStatement;
        const msgObject = {
          contentType: 'PlainText',
          content: response,
          groupNumber
        };

        const findObj = messages.find(message => message.content === response);
        if (!findObj) {
          messages.push(msgObject);
        }
      }

      return {
        withResponseCard: content => {
          if (!content) {
            throw new Error('Your responseCard can\'t be empty');
          }
  
          if (intent.conclusionStatement) {
            intent.conclusionStatement.responseCard = content;
          }
        }
      };
    },

    showMeIntent: () => {
      return intent;
    }
  }

  return app;
})();

module.exports = intentModule;