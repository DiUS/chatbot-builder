withIntent('HowAreYou', () => {
  utterance('how are you');
  utterance('how are you going');
  utterance('ow ya goin mate');
  responseMessage(`<p>I'm feeling good, thanks for asking.</p><p>What can I help you with?</p>`);
  responseCard();
});
