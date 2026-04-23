const express = require('express');

const router = express.Router();

const {
    createNote,
    createBulkNotes,
    getAllNotes,
    getNoteById,
    replaceNote,
} = require('../controllers/notes.controllers');

// CRUD Bulk Routes
router.post('/bulk', createBulkNotes);

// CRUD Single Item Routes
router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', replaceNote);

module.exports = router;