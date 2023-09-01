const express = require('express');
const router = express.Router();
const fs = require('fs');
let notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {

    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        notes.push(newNote);

        let notesString = JSON.stringify(notes, null, 3);

        fs.writeFile(`./db/db.json`, notesString, (err) =>
        err
            ? console.error(err)
            : console.log(`Note Has Been Added!`) 
        );

        const response = {
            status: 'success',
            body: newNote,
        };

        res.status(201).json(response);
    } else {
        res.status(500).json('Could Not Add Note: Error 500');
    }
});

router.delete('/notes/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile("./db/db.json", "utf8", (error, data) =>
    error ? console.error(error) : (notes = JSON.parse(data))
    );

    const deletedNote = notes.filter(note => note.id === req.params.id)

    if(deletedNote) {
        let filteredNotes = notes.filter(note => note.id != req.params.id)
        let notesString = JSON.stringify(filteredNotes, null, 3);
        fs.writeFile(`./db/db.json`, notesString, (err) =>
        err
        ? console.error(err)
        : console.log(`Note Has Been Deleted!`));

        res.status(200).json(filteredNotes);
    } else {
        res.status(500).json('Could Not Delete Note: Error 500');
    }
});

module.exports = router;