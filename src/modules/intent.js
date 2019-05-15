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

      app.resetIntent();

      intent = {...intent, name};

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

      if (intent.sampleUtterances && intent.sampleUtterances.indexOf(str) <= -1) {
        intent.sampleUtterances.push(str);
      }
    },

    utterances: arr => {
      if (!Array.isArray(arr)) {
        throw new Error('Your input needs to be a valid array');
      }

      const s = new Set([...intent.sampleUtterances, ...arr]);
      intent.sampleUtterances = [...s];
    },

    // should match the pattern in this way "(hi|hello), world!"
    utteranceWithPattern: (pattern) => {
      if (!pattern) {
        throw new Error('Utterance pattern can\'t be empty');
      }

      const matchedResults = intentUtteranceExpander(pattern);
      app.utterances(matchedResults);
    },

    responseMessage: (content) => {
      if (!content) {
        throw new Error('Your response can\'t be empty');
      }

      let msgObject = {};
      const { messages } = intent.conclusionStatement;
      const msgContent = typeof content === 'object' ? JSON.stringify(content) : content;

      msgObject = {
        content: msgContent,
        contentType: 'PlainText',
        groupNumber: 1,
      };

      const findObj = messages.find(message => message.content === content);
      if (!findObj) {
        messages.push(msgObject);
      }

      const ofCustomType = contentType => {
        if (!contentType) {
          throw new Error('The contentType of the intent can\'t be empty');
        }

        msgObject.contentType = contentType;

        return {
          ofGroup,
        };
      };

      const ofGroup = groupNumber => {
        if (!groupNumber || !Number.isInteger(groupNumber) || groupNumber < 0) {
          throw new Error('The groupNumber has to be a positive integer');
        }

        msgObject.groupNumber = groupNumber;

        return {
          ofCustomType,
        };
      };

      return {
        ofCustomType,
        ofGroup,
      };
    },

    withResponseCard: content => {
      if (!content) {
        throw new Error('Your responseCard can\'t be empty');
      }

      const cardContent = typeof content === 'object' ? JSON.stringify(content) : content;
      intent.conclusionStatement.responseCard = cardContent;
    },

    resetIntent: () => {
      intent = {
        description: '',
        name: '',
        fulfillmentActivity: { type: 'ReturnIntent' },
        sampleUtterances: [],
        slots: [],
        conclusionStatement: { messages: [] }
      };
    },

    showMeIntent: () => {
      return intent;
    }
  }

  return app;
})();

module.exports = intentModule;