const express = require('express');

const router = express.Router();

const {
    createNote,
    createBulkNotes,
    getAllNotes,
    getNoteById,
    replaceNote,
    updateNote,
    deleteNote,
} = require('../controllers/notes.controllers');

// CRUD Bulk Routes
router.post('/bulk', createBulkNotes);

// CRUD Single Item Routes
router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', replaceNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;