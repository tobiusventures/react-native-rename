const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const devTestRNProject = ''; // For Development eg '/Users/junedomingo/Desktop/RN49'
const __dirname = devTestRNProject || process.cwd();

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

const loadAppConfig = () => readFile(path.join(__dirname, 'app.json')).then(data => JSON.parse(data));

const loadAndroidManifest = () =>
  readFile(path.join(__dirname, 'android/app/src/main/AndroidManifest.xml')).then(data => cheerio.load(data));

function iosRequiredPaths(currentAppName) {
  const nS_CurrentAppName = currentAppName.replace(/\s/g, '');

  return [`ios/${nS_CurrentAppName}`];
}

module.exports = {
  __dirname,
  loadAppConfig,
  loadAndroidManifest,
  iosRequiredPaths,
};
