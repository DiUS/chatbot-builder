withIntent('PlasmaDonation', () => {
  utterance('Want to know more about plasma donation?');
  responseMessage(`Plasma donations give hope to those who rely on them to create vital treatments. We're still finding new ways plasma can help, but for now the uses include:`);
  responseMessage({
    type: 'joinPreviousMessage',
    text: 'Preventing blood clots in patients with rare blood disorders.'
  }).ofCustomType('CustomPayload').ofGroup(2);
  responseMessage({
    type: 'joinPreviousMessage',
    text: 'Protecting kids against chicken pox.'
  }).ofCustomType('CustomPayload').ofGroup(2);
  responseMessage({
    type: 'joinPreviousMessage',
    text: 'Fighting against tetanus infection.'
  }).ofCustomType('CustomPayload').ofGroup(2);
  responseMessage({
    type: 'joinPreviousMessage',
    text: 'During complex heart surgery.'
  }).ofCustomType('CustomPayload').ofGroup(2);
  responseMessage({
    type: 'joinPreviousMessage',
    text: 'Treating brain disorders.'
  }).ofCustomType('CustomPayload').ofGroup(2);
  responseMessage(`{\"type\":\"joinPreviousMessage\",\"text\":\"Helping stop critical bleeding.\"}`).ofCustomType('CustomPayload').ofGroup(3);
  responseMessage(`{\"type\":\"joinPreviousMessage\",\"text\":\"Protecting people with immune deficiencies.\"}`).ofCustomType('CustomPayload').ofGroup(3);
  responseMessage(`{\"type\":\"joinPreviousMessage\",\"text\":\"Treating complications from liver disease.\"}`).ofCustomType('CustomPayload').ofGroup(3);
  responseMessage(`{\"type\":\"joinPreviousMessage\",\"text\":\"Treating rare inherited blood disorders\"}`).ofCustomType('CustomPayload').ofGroup(3);
  responseMessage(`{\"type\":\"joinPreviousMessage\",\"text\":\"Protecting against tetanus.\"}`).ofCustomType('CustomPayload').ofGroup(3);
  responseMessage(`{\"type\":\"joinPreviousMessage\",\"text\":\"Fighting infection during bone marrow transplants.\"}`).ofCustomType('CustomPayload').ofGroup(4);
  responseMessage(`{\"type\":\"joinPreviousMessage\",\"text\":\"Protecting people exposed to hepatitis B.\"}`).ofCustomType('CustomPayload').ofGroup(4);
  responseMessage(`{\"type\":\"joinPreviousMessage\",\"text\":\"Protecting babies during pregnancy and birth against RH disease.\"}`).ofCustomType('CustomPayload').ofGroup(4);
  responseMessage(`{\"type\":\"joinPreviousMessage\",\"text\":\"Treating people with haemophilia B.\"}`).ofCustomType('CustomPayload').ofGroup(4);
});
