withIntent('Thanks', () => {
  utterance('thanks');
  responseMessage(`{\"version\":1,\"contentType\":\"application/vnd.amazonaws.card.generic\",\"genericAttachments\":[{\"title\":\"\",\"buttons\":[{\"text\":\"Book appointment\",\"value\":\"Book appointment\"},{\"text\":\"How plasma works\",\"value\":\"How plasma works\"},{\"text\":\"Who it helps\",\"value\":\"Who it helps\"},{\"text\":\"Am I eligible?\",\"value\":\"Am I eligible?\"}]}]}`);
});
