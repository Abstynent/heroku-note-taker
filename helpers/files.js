const fs = require('fs');
const util = require('util');

// Read file func
const readFromFile = util.promisify(fs.readFile);

// Write to file func
const writeToFile = (file, content) => {
    fs.writeFile(file, JSON.stringify(content, null, 4), (err) => 
    err ? console.error(err) : console.info('Database file updated. ✅'));
}

// Read file and append new notes
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);

            writeToFile(file, parsedData);
        }
    })
}

module.exports = { readFromFile, readAndAppend, writeToFile };