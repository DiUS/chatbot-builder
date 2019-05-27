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

    responseCard: () => {
      const defaultResponseCard = {
        version: 1,
        contentType: 'application/vnd.amazonaws.card.generic',
        genericAttachments: []
      };

      intent.conclusionStatement.responseCard = JSON.stringify(defaultResponseCard);

      const updateOriginalResponse = (field, value) => {
        const { responseCard } = intent.conclusionStatement;
        const responseCardJSON = JSON.parse(responseCard);
        responseCardJSON[field] = value;
        intent.conclusionStatement.responseCard = JSON.stringify(responseCardJSON);
      };

      const ofVersion = version => {
        if (!version || typeof version !== 'number' || version < 0) {
          throw new Error('The version has to be a positive number');
        }
        updateOriginalResponse('version', version);

        return {
          ofContentType,
          withLink,
          withButton
        };
      };

      const ofContentType = contentType => {
        if (!contentType) {
          throw new Error('Please enter a valid contentType');
        }
        updateOriginalResponse('contentType', contentType);

        return {
          ofVersion,
          withLink,
          withButton
        }
      };

      const withLink = link => {
        if (!link || !link.title || !link.attachmentLinkUrl) {
          throw new Error('Please enter a valid link object');
        }

        const { responseCard } = intent.conclusionStatement;
        const responseCardJSON = JSON.parse(responseCard);
        responseCardJSON.genericAttachments.push(link);
        intent.conclusionStatement.responseCard = JSON.stringify(responseCardJSON);

        return {
          ofContentType,
          ofVersion,
          withLink,
          withButton
        };
      };

      const withButton = button => {
        if (!button) {
          throw new Error('Please enter a valid button name or an object with text and value fields');
        }

        const { responseCard } = intent.conclusionStatement;
        const responseCardJSON = JSON.parse(responseCard);

        let hasButtons = responseCardJSON.genericAttachments.find(attachment => attachment.buttons)
        if (!hasButtons) {
          responseCardJSON.genericAttachments.push({ buttons: [] });
        }
        
        const { buttons } = responseCardJSON.genericAttachments.find(attachment => attachment.buttons);
        if (typeof button === 'string') {
          buttons.push({ text: button, value: button });
        } else if (typeof button === 'object') {
          buttons.push(button);
        }
        
        intent.conclusionStatement.responseCard = JSON.stringify(responseCardJSON);

        return {
          ofContentType,
          ofVersion,
          withLink,
          withButton
        };
      };

      return {
        ofVersion,
        ofContentType,
        withLink,
        withButton
      }
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
