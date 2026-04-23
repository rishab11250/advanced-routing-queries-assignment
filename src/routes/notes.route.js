const express = require('express');

const router = express.Router();

const {
    createNote,
    createBulkNotes,
    getAllNotes,
} = require('../controllers/notes.controllers');

// CRUD Bulk Routes
router.post('/bulk', createBulkNotes);

// CRUD Single Item Routes
router.post('/', createNote);
router.get('/', getAllNotes);

module.exports = router;