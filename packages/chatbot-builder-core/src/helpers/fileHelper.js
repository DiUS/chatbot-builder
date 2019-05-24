/* eslint-disable no-console */
const fs = require('fs');
const glob = require('glob');
const path = require('path');

class FileHelper {
  constructor() {
    this.loadedFiles = [];
  }

  readFileFromPath(filepath) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${filepath}`, 'utf8', (error, data) => {
        if (error || !filepath) {
          return reject(error);
        }

        resolve(data);
      });
    });
  }

  loadFilesFromDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
      glob(directoryPath, (err, files) => {
        if (err) {
          reject(err);
        }

        let fileLoaded = 0;
        files.forEach(async (file) => {
          const data = await this.readFileFromPath(file);
          this.loadedFiles.push({
            data,
            filename: file.replace(/^.*[\\\/]/, '').split('.')[0] // eslint-disable-line
          });

          fileLoaded++;

          if (fileLoaded === files.length) {
            resolve(this.loadedFiles);
          }
        });
      })
    });
  }

  async writeToFile(botJSON, fileDirectory, filename) {
    const exportUrl = path.resolve('./', fileDirectory);
    const response = new Promise((resolve, reject) => {
      fs.mkdir(exportUrl, { recursive: true }, async (err) => {
        if (err || !fileDirectory || !filename) {
          reject(err);
        }

        const nowTime = Date.now();
        const outputUrl = `${exportUrl}/${filename}_${nowTime}.json`;
        await fs.writeFile(outputUrl, JSON.stringify(botJSON), err => {
          if (err || !fileDirectory) {
            reject(err)
          }

          console.log(`${filename}_${nowTime}.json has been generated successfully!`); // eslint-disable-line
          resolve(outputUrl);
        });
      })
    });

    return await response;
  }
}

module.exports = FileHelper;
