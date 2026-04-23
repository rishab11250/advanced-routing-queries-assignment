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
    deleteBulkNotes,
    getNotesByCategory,
    getNotesByStatus,
    getNoteSummary,
    filterNotes,
    getPinnedNotes,
    filterByCategory,
    filterByDateRange,
} = require('../controllers/notes.controllers');

// CRUD Bulk Routes
router.post('/bulk', createBulkNotes);
router.delete('/bulk', deleteBulkNotes);

// Route Param Sections
router.get('/category/:category', getNotesByCategory);
router.get('/status/:isPinned', getNotesByStatus);

// Query Param Sections
router.get('/filter', filterNotes);
router.get('/filter/pinned', getPinnedNotes);
router.get('/filter/category', filterByCategory);
router.get('/filter/date-range', filterByDateRange);

// CRUD Single Item Routes
router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id/summary', getNoteSummary);
router.get('/:id', getNoteById);
router.put('/:id', replaceNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;