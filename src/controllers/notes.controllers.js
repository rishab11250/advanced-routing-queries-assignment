const Note = require('../models/notes.model');

const createNote = async (req, res) => {
    try {
        const { title, content, category, isPinned } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required",
                data: null
            });
        }

        const newNote = new Note({ title, content, category, isPinned });
        await newNote.save();

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: newNote
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create note",
            data: error.message
        });
    }
};

const createBulkNotes = async (req, res) => {
    try {
        const { notes } = req.body;

        if (!notes || !Array.isArray(notes) || notes.length === 0) {
            return res.status(400).json({
                success: false,
                message: "notes array is required and cannot be empty",
                data: null
            });
        }

        const createdNotes = await Note.insertMany(notes);

        res.status(201).json({
            success: true,
            message: `${createdNotes.length} notes created successfully`,
            data: createdNotes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create bulk notes",
            data: error.message
        });
    }
};

module.exports = {
    createNote,
    createBulkNotes
};