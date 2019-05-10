withIntent('Smalltalk_NiceToMeetYou', () => {
  utterance('nice to meet you');
  utterances(['nice meeting you', 'nice to meet you']);
  responseMessage(`<p>Thanks, it's nice to meet you too.</p><p>What can I help you with?</p>`)
    .withResponseCard(`{\"version\":1,\"contentType\":\"application/vnd.amazonaws.card.generic\",\"genericAttachments\":[{\"title\":\"\",\"buttons\":[{\"text\":\"Book appointment\",\"value\":\"Book appointment\"},{\"text\":\"How plasma works\",\"value\":\"How plasma works\"},{\"text\":\"Who it helps\",\"value\":\"Who it helps\"},{\"text\":\"Am I eligible?\",\"value\":\"Am I eligible?\"}]}]}`);
});