const mongoose = require('mongoose');
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

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch notes",
            data: error.message
        });
    }
};

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid note ID",
                data: null
            });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            data: note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch note",
            data: error.message
        });
    }
};

const replaceNote = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid note ID",
                data: null
            });
        }

        const replacedNote = await Note.findByIdAndUpdate(
            id,
            req.body,
            { new: true, overwrite: true, runValidators: true }
        );

        if (!replacedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Note replaced successfully",
            data: replacedNote
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to replace note",
            data: error.message
        });
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid note ID",
                data: null
            });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided to update",
                data: null
            });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: updatedNote
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update note",
            data: error.message
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid note ID",
                data: null
            });
        }

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            data: null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete note",
            data: error.message
        });
    }
};

const deleteBulkNotes = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "ids array is required and cannot be empty",
                data: null
            });
        }

        const result = await Note.deleteMany({ _id: { $in: ids } });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} notes deleted successfully`,
            data: null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete bulk notes",
            data: error.message
        });
    }
};

const getNotesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const allowedCategories = ["work", "personal", "study"];

        if (!allowedCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category. Allowed: work, personal, study",
                data: null
            });
        }

        const notes = await Note.find({ category });

        if (notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No notes found for category: ${category}`,
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: `Notes fetched for category: ${category}`,
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch notes by category",
            data: error.message
        });
    }
};

module.exports = {
    createNote,
    createBulkNotes,
    getAllNotes,
    getNoteById,
    replaceNote,
    updateNote,
    deleteNote,
    deleteBulkNotes,
    getNotesByCategory
};