/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const fs = require('fs');
const glob = require('glob');
const FileHelper = require('../fileHelper');

// mocks
jest.mock('fs');
jest.mock('glob');

fs.readFile.mockImplementation(
  (filename, t = 'utf8', cb = (error, data) => {
    if (error || !filename) Promise.reject('error');
    Promise.resolve({ data, t, error, filename })
  }
) => cb(null, 'success'));

fs.mkdir.mockImplementation((
  exportUrl,
  option,
  cb = err => {
    if (err) Promise.reject('error');
    resolve('success');
  }
) => {
  cb(!exportUrl || !option);
});

fs.writeFile.mockImplementation((
  outputUrl,
  jsonBody,
  cb = (err) => {
    if (err) Promise.reject('error');
    resolve('success');
  }
) => {
  cb(!outputUrl || !jsonBody);
});

glob.mockImplementation((path, cb = (err, files) => {
  if (err) Promise.reject(err);
  Promise.resolve(files);
}) => {
  const error = !path ? 'error' : null;
  const response = !path ? null : ['a.json', 'b.json'];
  cb(error, response);
})

// tests
describe('Testing fileHelper functions', () => {
  test('fileHelper should init with default values', () => {
    const fileHelper = new FileHelper();
    expect(fileHelper.loadedFiles.length).toBe(0);
  });

  test('readFileFromPath() should return the correct data from the file', async () => {
    const fileHelper = new FileHelper();
    const fileData = await fileHelper.readFileFromPath('.exchatrc');
    expect(fs.readFile).toHaveBeenCalled();
    expect(fileData).toBe('success');
  });

  test('readFileFromPath() should reject the response if filename is invalid', async () => {
    const fileHelper = new FileHelper();
    await expect(fileHelper.readFileFromPath(null)).rejects.toBe(null);
  });

  test('loadFilesFromDirectory() should return correct files from the given directory', async () => {
    const fileHelper = new FileHelper();
    const fileData = await fileHelper.loadFilesFromDirectory('./');
    expect(fs.readFile).toHaveBeenCalled();
    expect(fileData.length).toBe(2);
    expect(fileData[0].data).toBe('success');
    expect(fileData[0].filename).toBe('a');
    expect(fileData[1].data).toBe('success');
    expect(fileData[1].filename).toBe('b');
  });

  test('loadFilesFromDirectory() should reject the response if filepath is invalid', async () => {
    const fileHelper = new FileHelper();
    await expect(fileHelper.loadFilesFromDirectory(null)).rejects.toBe('error');
  });

  test('writeToFile() should create directory and write to file', async () => {
    const fileHelper = new FileHelper();
    const fileData = await fileHelper.writeToFile({ data: 'test'}, '/', 'test.json');
    expect(fs.writeFile).toHaveBeenCalled();
    expect(fileData).toContain('.json');
  });

  test('writeToFile() should reject the response if filepath is invalid', async () => {
    const fileHelper = new FileHelper();
    await expect(fileHelper.writeToFile(undefined, '/', 'abc')).rejects.toBeDefined();
    await expect(fileHelper.writeToFile({ data: 'test' }, undefined, 'blah')).rejects.toBeDefined();
    await expect(fileHelper.writeToFile({ data: 'test' }, '/', undefined)).rejects.toBeDefined();
  });
});
