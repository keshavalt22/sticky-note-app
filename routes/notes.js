// note.route.js
const express = require('express');
const router = express.Router();
const Note = require('../models/notes');


// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new note
router.post('/', async (req, res) => {
    try {
        const { content } = req.body;
        const newNote = new Note({ content });
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific note by ID
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a note by ID
router.put('/:id', async (req, res) => {
    try {
        const { content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true }
        );
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;

