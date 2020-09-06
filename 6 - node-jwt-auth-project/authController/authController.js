
const User = require("../models/User");
const jwt = require('jsonwebtoken');


// error handler function
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // checking for incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'This email is not register';
    }

    // checking for incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'This password is incorrect';
    }

    // duplicate user creation error code
    if (err.code === 11000) {
        errors.email = "This email is already register";
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}


// creating a jwt token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'mark wisdom reeves json web token', {
        expiresIn: maxAge
    });
}


module.exports.signup_get = (req, res) => {
    res.render("signup");
}

module.exports.login_get = (req, res) => {
    res.render("login");
}

// create a new user in the database
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        // call the token function right after we create a new user in the database
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } 
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

// to logout user
module.exports.logout_get = (err, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}