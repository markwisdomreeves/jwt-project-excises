
const router = require('express').Router()
const userCtrl = require('../controllers/userController');
// const authMiddleware = require('../middlewares/authMiddleware');


// This is the Register User router to register user
router.post('/register', userCtrl.registerUser);

// This is the Login User router to login user
router.post('/login', userCtrl.loginUser);

// verify Token
router.get('/verify', userCtrl.verifiedToken);



module.exports = router;
