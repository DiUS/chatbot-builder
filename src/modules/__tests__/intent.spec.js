/* eslint-disable no-undef */
const {withIntent, utterance, utterances, utteranceWithPattern, responseMessage, withResponseCard, showMeIntent, resetIntent } = require('../intent');

describe('Testing intentModule functions', () => {
  beforeEach(() => {
    resetIntent();
  });

  test('withIntent() should return an intent with default value, if there is no callback', () => {
    const intent = withIntent('myIntent', null);
    expect(intent.name).toBe('myIntent');
    expect(intent.description).toBe('');
    expect(intent.fulfillmentActivity.type).toBe('ReturnIntent');
    expect(intent.sampleUtterances.length).toBe(0);
    expect(intent.slots.length).toBe(0);
    expect(intent.conclusionStatement.messages.length).toBe(0);
  });

  test('withIntent() should throw an error if name is not specified', () => {
    expect(() => withIntent(null)).toThrow('Intent name can\'t be empty');
    expect(() => withIntent('intent')).not.toThrow();
  });

  test('withIntent() should return an intent, if there is a callback', () => {
    const callback = jest.fn();
    const intent = withIntent('myIntent', callback);
    expect(intent.name).toBe('myIntent');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('utterance() should throw an error if content is not specified', () => {
    expect(() => utterance(null)).toThrow('Utterance can\'t be empty');
    expect(() => utterance('utterance')).not.toThrow();
  });

  test('utterance() should push the utterance to the intent object, but repeated utterances will be ignored', () => {
    const myIntent = showMeIntent();
    utterance('testUtterance');
    expect(myIntent.sampleUtterances.length).toBe(1);
    utterance('testUtterance');
    expect(myIntent.sampleUtterances.length).toBe(1);
  });

  test('utterances() should return an error if content is not valid array', () => {
    expect(() => utterances(null)).toThrow('Your input needs to be a valid array');
    expect(() => utterances('abc')).toThrow('Your input needs to be a valid array');
    expect(() => utterances(1)).toThrow('Your input needs to be a valid array');
    expect(() => utterances(['a', 'b'])).not.toThrow('Your input needs to be a valid array');
  });

  test('utterances() should add utterances to the intent', () => {
    const myIntent = showMeIntent();
    utterances(['a1', 'b1']);
    expect(myIntent.sampleUtterances.length).toBe(2);
  });

  test('utteranceWithPattern() should throw an error if content is not specified', () => {
    expect(() => utteranceWithPattern(null)).toThrow('Utterance pattern can\'t be empty');
    expect(() => utteranceWithPattern('(hi|hey) yo')).not.toThrow();
  });

  test('utteranceWithPattern() add all the related utterances to the intent', () => {
    const myIntent = showMeIntent();
    utteranceWithPattern('(hello|hi|hey), (John|Bob).');
    expect(myIntent.sampleUtterances.length).toBe(6);
  });

  test('responseMessage() should throw an error if content is not specified', () => {
    expect(() => responseMessage(null)).toThrow('Your response can\'t be empty');
    expect(() => responseMessage('nice')).not.toThrow();
  });

  test('responseMessage() should accept both string and object as a parameter', () => {
    expect(() => responseMessage('I am good, thanks')).not.toThrow();
    expect(() => responseMessage({ 
      type: 'joinPreviousMessage',
      text: 'Protecting kids against chicken pox.' 
    })).not.toThrow();
  });

  test('responseMessage() should use default contentType and groupNumber, if they are not specified', () => {
    const myIntent = showMeIntent();
    responseMessage('nice');
    expect(myIntent.conclusionStatement.messages.length).toBe(1);
    expect(myIntent.conclusionStatement.messages[0].contentType).toBe('PlainText');
    expect(myIntent.conclusionStatement.messages[0].content).toBe('nice');
    expect(myIntent.conclusionStatement.messages[0].groupNumber).toBe(1);
  });

  test('responseMessage() should add new message to the intent response and ignore the exsiting ones.', () => {
    const myIntent = showMeIntent();
    responseMessage('nice');
    responseMessage('nice');
    responseMessage('great');
    expect(myIntent.conclusionStatement.messages.length).toBe(2);
  });

  test('responseMessage() can chain with ofCustomType() to set the contentType of the response message, and throw an error if the contentType is not valid', () => {
    const myIntent = showMeIntent();
    responseMessage('nice').ofCustomType('custom');
    expect(myIntent.conclusionStatement.messages[0].contentType).toBe('custom');
    expect(() => responseMessage('nice').ofCustomType(null)).toThrow('The contentType of the intent can\'t be empty');
  });

  test('responseMessage() can chain with ofGroup() to set the groupNumber of the response message, and throw an error if the groupNumber is not valid', () => {
    const myIntent = showMeIntent();
    responseMessage('nice').ofGroup(10);
    expect(myIntent.conclusionStatement.messages[0].groupNumber).toBe(10);
    expect(() => responseMessage('nice').ofGroup(null)).toThrow('The groupNumber has to be a positive integer');
    expect(() => responseMessage('nice').ofGroup(-1)).toThrow('The groupNumber has to be a positive integer');
    expect(() => responseMessage('nice').ofGroup('abc')).toThrow('The groupNumber has to be a positive integer');
  });

  test('withResponseCard() should throw an error if content is not specified', () => {
    expect(() => withResponseCard(null)).toThrow('Your responseCard can\'t be empty');
    expect(() => withResponseCard('sample')).not.toThrow();
  });

  test('withResponseCard() should accept both string and object as a parameter', () => {
    expect(() => withResponseCard('I am good, thanks')).not.toThrow();
    expect(() => withResponseCard({ 
      version: '1.0',
      genericAttachments: 'attachement'
    })).not.toThrow();
  });
});