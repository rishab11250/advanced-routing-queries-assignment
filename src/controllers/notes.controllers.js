const Note = require('../models/notes.model');

const createNote = async(req, res) =>{
    try{
        const { title, content, category, isPinned } = req.body;
        const newNote = new Note({ title, content, category, isPinned });
        await newNote.save();
        res.status(201).json({success: true, message: "Note created successfully", data: newNote});
    }
    catch(error){
        res.status(500).json({success: false, message: "Failed to create note", data: error});
    }
}

module.exports = {createNote};