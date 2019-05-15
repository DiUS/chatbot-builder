const fs = require('fs');
const glob = require('glob');

class FileHelper {
  constructor() {
    this.loadedFiles = [];
  }

  readFileFromPath(filepath) {
    return new Promise((resolve, reject) => {
      console.log('come here...'); // eslint-disable-line
      fs.readFile(`${filepath}`, 'utf8', (error, data) => {
        console.log('data: ', data, error); // eslint-disable-line
        if (error && filepath) {
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
    const exportUrl = `${__dirname}/..${fileDirectory}`;
    const response = new Promise((resolve, reject) => {
      fs.mkdir(exportUrl, { recursive: true }, async (err) => {
        if (err) {
          reject(err);
        }

        const nowTime = Date.now();
        const outputUrl = `${exportUrl}/${filename}_${nowTime}.json`;
        await fs.writeFile(outputUrl, JSON.stringify(botJSON), err => {
          if (err) {
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