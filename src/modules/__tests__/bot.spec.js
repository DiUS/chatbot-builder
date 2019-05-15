const { buildBot } = require('../bot');
const intent = require('../intent');

describe('Testing bot module', () => {
  test('buildBot() should return a bot with default value, if there is no callback', () => {
    const bot = buildBot('myBot', null);
    expect(bot.name).toBe('myBot');
    expect(bot.intents.length).toBe(0);
  });

  test('buildBot() should return a bot, if there is a callback', () => {
    const callback = jest.fn();
    const bot = buildBot('myBot', callback);
    expect(bot.name).toBe('myBot');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('buildBot() if name is not specified, there should be an error', () => {
    expect(() => buildBot(null)).toThrow('Bot name can\'t be empty');
    expect(() => buildBot('myBot')).not.toThrow();
  });
});