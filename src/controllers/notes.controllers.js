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

const getNotesByStatus = async (req, res) => {
    try {
        const { isPinned } = req.params;

        if (isPinned !== "true" && isPinned !== "false") {
            return res.status(400).json({
                success: false,
                message: "isPinned must be true or false",
                data: null
            });
        }

        const pinned = isPinned === "true";
        const notes = await Note.find({ isPinned: pinned });

        res.status(200).json({
            success: true,
            message: pinned ? "Fetched all pinned notes" : "Fetched all unpinned notes",
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch notes by status",
            data: error.message
        });
    }
};

const getNoteSummary = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid note ID",
                data: null
            });
        }

        const note = await Note.findById(id).select("title category isPinned createdAt");

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Note summary fetched successfully",
            data: note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch note summary",
            data: error.message
        });
    }
};

const filterNotes = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) filter.category = req.query.category;
        if (req.query.isPinned !== undefined) filter.isPinned = req.query.isPinned === "true";

        const notes = await Note.find(filter);

        res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to filter notes",
            data: error.message
        });
    }
};

const getPinnedNotes = async (req, res) => {
    try {
        const filter = { isPinned: true };
        if (req.query.category) filter.category = req.query.category;

        const notes = await Note.find(filter);

        res.status(200).json({
            success: true,
            message: "Pinned notes fetched successfully",
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch pinned notes",
            data: error.message
        });
    }
};

const filterByCategory = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Query param 'name' is required",
                data: null
            });
        }

        const notes = await Note.find({ category: name });

        res.status(200).json({
            success: true,
            message: `Notes filtered by category: ${name}`,
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to filter notes by category",
            data: error.message
        });
    }
};

const filterByDateRange = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({
                success: false,
                message: "Both 'from' and 'to' query params are required",
                data: null
            });
        }

        const notes = await Note.find({
            createdAt: {
                $gte: new Date(from),
                $lte: new Date(to)
            }
        });

        res.status(200).json({
            success: true,
            message: `Notes fetched between ${from} and ${to}`,
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to filter notes by date range",
            data: error.message
        });
    }
};

const paginateNotes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Note.countDocuments();
        const totalPages = Math.ceil(total / limit);
        const notes = await Note.find().skip(skip).limit(limit);

        res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            data: notes,
            pagination: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to paginate notes",
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
    getNotesByCategory,
    getNotesByStatus,
    getNoteSummary,
    filterNotes,
    getPinnedNotes,
    filterByCategory,
    filterByDateRange,
    paginateNotes
};