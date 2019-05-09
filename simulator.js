const { buildBot } = require('./src/exchat').bot;
const { withIntent, utterance, utterances, utteranceWithPattern, responseMessage } = require('./src/exchat').intent;

const myBot = buildBot('SmartBot', () => {
  withIntent('Smalltalk_HowAreYou', () => {
    utterance('how are you');
    utterance('how are you going');
    utterance('ow ya goin mate');
    responseMessage(`<p>I'm feeling good, thanks for asking.</p><p>What can I help you with?</p>`)
      .withResponseCard(`{\"version\":1,\"contentType\":\"application/vnd.amazonaws.card.generic\",\"genericAttachments\":[{\"title\":\"\",\"buttons\":[{\"text\":\"Book appointment\",\"value\":\"Book appointment\"},{\"text\":\"How plasma works\",\"value\":\"How plasma works\"},{\"text\":\"Who it helps\",\"value\":\"Who it helps\"},{\"text\":\"Am I eligible?\",\"value\":\"Am I eligible?\"}]}]}`);
  });

  withIntent('Smalltalk_WhatsUp', () => {
    utterance('what\'s up');
    responseMessage(`<p>The usual, life's good for a bot.</p><p>What can I help you with?</p>`)
      .withResponseCard(`{\"version\":1,\"contentType\":\"application/vnd.amazonaws.card.generic\",\"genericAttachments\":[{\"title\":\"\",\"buttons\":[{\"text\":\"Book appointment\",\"value\":\"Book appointment\"},{\"text\":\"How plasma works\",\"value\":\"How plasma works\"},{\"text\":\"Who it helps\",\"value\":\"Who it helps\"},{\"text\":\"Am I eligible?\",\"value\":\"Am I eligible?\"}]}]}`);
  });
  
  withIntent('Smalltalk_NiceToMeetYou', () => {
    utterance('nice to meet you');
    utterances(['nice meeting you', 'nice to meet you']);
    responseMessage(`<p>Thanks, it's nice to meet you too.</p><p>What can I help you with?</p>`)
      .withResponseCard(`{\"version\":1,\"contentType\":\"application/vnd.amazonaws.card.generic\",\"genericAttachments\":[{\"title\":\"\",\"buttons\":[{\"text\":\"Book appointment\",\"value\":\"Book appointment\"},{\"text\":\"How plasma works\",\"value\":\"How plasma works\"},{\"text\":\"Who it helps\",\"value\":\"Who it helps\"},{\"text\":\"Am I eligible?\",\"value\":\"Am I eligible?\"}]}]}`);
  });

  withIntent('Smalltalk_GoodMorning', () => {
    utterance('good morning');
    responseMessage(`<p>The usual, life's good for a bot.</p><p>What can I help you with?</p>`)
      .withResponseCard(`{\"version\":1,\"contentType\":\"application/vnd.amazonaws.card.generic\",\"genericAttachments\":[{\"title\":\"\",\"buttons\":[{\"text\":\"Book appointment\",\"value\":\"Book appointment\"},{\"text\":\"How plasma works\",\"value\":\"How plasma works\"},{\"text\":\"Who it helps\",\"value\":\"Who it helps\"},{\"text\":\"Am I eligible?\",\"value\":\"Am I eligible?\"}]}]}`);
  });

  withIntent('Smalltalk_GoodMorning', () => {
    utterance('good morning');
    responseMessage(`<p>The usual, life's good for a bot.</p><p>What can I help you with?</p>`)
      .withResponseCard(`{\"version\":1,\"contentType\":\"application/vnd.amazonaws.card.generic\",\"genericAttachments\":[{\"title\":\"\",\"buttons\":[{\"text\":\"Book appointment\",\"value\":\"Book appointment\"},{\"text\":\"How plasma works\",\"value\":\"How plasma works\"},{\"text\":\"Who it helps\",\"value\":\"Who it helps\"},{\"text\":\"Am I eligible?\",\"value\":\"Am I eligible?\"}]}]}`);
  });

  withIntent('Smalltalk_Thanks', () => {
    utterance('thanks');
    responseMessage(`{\"version\":1,\"contentType\":\"application/vnd.amazonaws.card.generic\",\"genericAttachments\":[{\"title\":\"\",\"buttons\":[{\"text\":\"Book appointment\",\"value\":\"Book appointment\"},{\"text\":\"How plasma works\",\"value\":\"How plasma works\"},{\"text\":\"Who it helps\",\"value\":\"Who it helps\"},{\"text\":\"Am I eligible?\",\"value\":\"Am I eligible?\"}]}]}`);
  });
  
  withIntent('Smalltalk_Goodbye', () => {
    utterances(['bye', 'goodbye', 'see you']);
    utteranceWithPattern(`(catch|see) you later`);
    responseMessage(`Bye! I look forward to chatting with you again soon.`)
      .withResponseCard(`{\"version\":1,\"contentType\":\"application/vnd.amazonaws.card.generic\",\"genericAttachments\":[]}`);
  });
});

console.log('myBot', JSON.stringify(myBot));