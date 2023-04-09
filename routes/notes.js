const notes = require('express').Router();
const DB = './db/db.json';

const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/files.js');


notes.get('/', (req, res) => {
    readFromFile(DB).then((data) => res.json(JSON.parse(data)))
})

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if(title && text) {
        let newID = uuid();
        const newNote = {
            title,
            text,
            id: newID,
        }
        
        const response = {
            status: 'success',
            body: newNote,
        }

        readAndAppend(newNote, DB);
        console.info(`New note saved, ID: ${newID} 📝`)
        res.json(response)
    } else {
        res.json('Error in saving the note.')
    }
})

notes.delete('/:id', (req, res) => {
    readFromFile(DB).then((data) => {
        const { id } = req.params;

        let parsedData = JSON.parse(data);

        const indexOfNote = parsedData.findIndex(note => note.id === id );
        console.log(indexOfNote)
    })


})
module.exports = notes;