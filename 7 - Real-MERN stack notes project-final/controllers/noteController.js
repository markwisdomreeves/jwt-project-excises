
const Notes = require('../models/noteModel');


const noteCtrl = {
    getNotes: async (req, res) => {
        try {
            const notes = await Notes.find({user_id: req.user.id})
            res.json(notes)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    createNote: async (req, res) => {
        try {
            const { title, content, date } = req.body;
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name
            })

            await newNote.save();
            res.json({msg: "Created a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteNote: async (req, res) => {
        try {
            await Notes.findOneAndDelete(req.params.id)
            res.json({msg: "You have Deleted a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateNote: async (req, res) => {
        try {
            const {title, content, date} = req.body;
            await Notes.findOneAndUpdate({_id: req.params.id}, {
                title,
                content,
                date
            })
            res.json({msg: "You have updated the Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getSingleNote: async (req, res) => {
        try {
            const singleNote = await Notes.findById(req.params.id)
            res.json(singleNote)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }



}


module.exports = noteCtrl;