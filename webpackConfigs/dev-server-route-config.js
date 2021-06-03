const fs = require('fs');
const util = require('util');
const path = require('path');
const root = path.join(__dirname, '../');
const readFile = util.promisify(fs.readFile).bind(fs)

module.exports = function(app, server, compiler) {
  const sendResponse = function(req, res, status = 200, body = {}, header = {}) {
    const defaultHeader = {
      'Content-Type': 'application/json',
      'charset': 'utf-8',
    };
    const responseHeader = Object.assign(defaultHeader, header);
    res.writeHead(status, responseHeader).end(JSON.stringify(body));
  }

  const sendResponseFromJsonFile = async function(req, res, fileName, isNoneCommitFile = false) {
    const storedDir = isNoneCommitFile ? 'var' : 'data/mock_data'
    const relPath = `${storedDir}/${fileName}`;
    const filepath = path.join(root, relPath);
    try {
      const data = await await readFile(filepath);
      const parsedData = JSON.parse(data);
      sendResponse(req, res, 200, parsedData);
    } catch (err) {
      sendResponse(req, res, 500, err);
    }
  }

  app.get('/api/site_config/firebase', async function(req, res) {
    sendResponseFromJsonFile(req, res, 'firebase-app-sdk-config.json', true)
  });
}

