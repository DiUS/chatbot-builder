/* eslint-disable no-undef */
const fs = require('fs');
const FileHelper = require('../fileHelper'); 
jest.mock('fs');

describe('Testing fileHelper functions', () => {
  test('fileHelper should init with default values', () => {
    const fileHelper = new FileHelper();
    expect(fileHelper.loadedFiles.length).toBe(0);
  });

  test('readFileFromPath() should return the correct data from the file', () => {
    const fileHelper = new FileHelper();
    fs.readFile = jest.fn();
    fs.readFile.mockImplementation(() => Promise.resolve({ data: 'test' }));

    fileHelper.readFileFromPath('test.json');
    expect(fs.readFile).toHaveBeenCalled();
  });
});