/* eslint-disable no-undef */

const configuration = require('../index');
const FileHelper = require('../../helpers/fileHelper'); 

jest.mock('../../helpers/fileHelper');

FileHelper.mockImplementation(() => {
  return {
    readFileFromPath: jest.fn(() => JSON.stringify({ config: 'ok' }))
  }
})

describe('Testing config functions', () => {
  test('configuration() should return the config settings', async () => {
    const data = await configuration();
    expect(data.config).toBe('ok');
  });
});
