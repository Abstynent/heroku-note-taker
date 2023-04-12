const notes = require('express').Router();
const DB = './db/db.json';

// Import helper files
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/files.js');

// GET data from the file
notes.get('/', (req, res) => {
    readFromFile(DB).then((data) => res.json(JSON.parse(data)))
})

// POST method
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    // Check if POST method has note title and text
    if(title && text) {
        let newID = uuid();
        const newNote = {
            title,
            text,
            id: newID,
        }
        
        // Create response object
        const response = {
            status: 'success',
            body: newNote,
        }

        // Add new note the the file
        readAndAppend(newNote, DB);
        console.info(`New note saved, ID: ${newID} 📝`)
        res.json(response)
    } else {
        res.json('Error in saving the note.')
    }
})

// DELETE note
notes.delete('/:id', (req, res) => {
    readFromFile(DB).then((data) => {
        const { id } = req.params;

        // If ID provided
        if(id) { 
            let parsedData = JSON.parse(data);
            // Find selected note in saved data
            const indexOfNote = parsedData.findIndex(note => note.id === id );
        
            // Remove selected note from the object
            parsedData.splice(indexOfNote, 1);
            // Save new object to the file
            writeToFile('./db/db.json', parsedData);

            // Create response
            const response = {
                status: 'success',
            }
            console.info(`Note with ID: ${id} removed ❌`)
            res.json(response);
        } else {
            res.json('Error in removing the note.')
        }

    })


})

module.exports = notes;