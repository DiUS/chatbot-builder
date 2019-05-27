/* eslint-disable no-undef */

const configuration = require('../index');
const FileHelper = require('../../helpers/fileHelper'); 

jest.mock('../../helpers/fileHelper');

describe('Testing config functions', () => {
  test('configuration() should return the config settings', async () => {
    FileHelper.mockImplementation(() => {
      return {
        readFileFromPath: jest.fn(() => JSON.stringify({ config: 'ok' }))
      }
    });

    const data = await configuration();
    expect(data.config).toBe('ok');
  });

  test('configuration() should throw an error if file read error happens', async () => {
    FileHelper.mockImplementation(() => {
      return {
        readFileFromPath: jest.fn(() => { throw 'file is not found' })
      }
    });

    try {
      const data = await configuration();
      expect(data.config).toBe('ok'); // you won't get here.
    } catch (error) {
      expect(error).toBe('The configuration file is not found, please create .exchatrc in the root folder.');
    }
  });
});
