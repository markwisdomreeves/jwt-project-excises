
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const noteCtrl = require('../controllers/noteController');


router.route('/')
    .get(authMiddleware, noteCtrl.getNotes)
    .post(authMiddleware, noteCtrl.createNote)


router.route('/:id')
    .get(authMiddleware, noteCtrl.getSingleNote)
    .put(authMiddleware, noteCtrl.updateNote)
    .delete(authMiddleware, noteCtrl.deleteNote)





module.exports = router;