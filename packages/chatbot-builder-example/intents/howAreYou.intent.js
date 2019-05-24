withIntent('HowAreYou', () => {
  utterance('how are you');
  utterance('how are you going');
  utterance('ow ya goin mate');
  responseMessage(`<p>I'm feeling good, thanks for asking.</p><p>What can I help you with?</p>`);
  withResponseCard(`{\"version\":1,\"contentType\":\"application/vnd.amazonaws.card.generic\",\"genericAttachments\":[{\"title\":\"\",\"buttons\":[{\"text\":\"Book appointment\",\"value\":\"Book appointment\"},{\"text\":\"How plasma works\",\"value\":\"How plasma works\"},{\"text\":\"Who it helps\",\"value\":\"Who it helps\"},{\"text\":\"Am I eligible?\",\"value\":\"Am I eligible?\"}]}]}`);
});
