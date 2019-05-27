withIntent('Goodbye', () => {
  utterances(['bye', 'goodbye', 'see you']);
  utteranceWithPattern(`(catch|see) you later`);
  responseMessage(`Bye! I look forward to chatting with you again soon.`);
  responseCard();
});
