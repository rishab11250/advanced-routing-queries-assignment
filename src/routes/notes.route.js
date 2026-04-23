const express = require('express');

const router = express.Router();

const {
    createNote,
    createBulkNotes,
} = require('../controllers/notes.controllers');

// CRUD Bulk Routes
router.post('/bulk', createBulkNotes);

// CRUD Single Item Route
router.post('/', createNote);

module.exports = router;