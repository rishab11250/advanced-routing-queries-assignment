const express = require('express');

const router = express.Router();

const {
    createNote,
} = require('../controllers/notes.controllers');

// CRUD Single Item Route
router.post('/', createNote);

module.exports = router;