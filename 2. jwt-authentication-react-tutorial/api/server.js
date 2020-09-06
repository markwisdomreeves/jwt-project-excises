
'use strict';

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const data = require("./data");
const middleware = require("./middleware");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get('/api/tips/regular', (req, res) => {
    res.json(data.regular);
});


app.get('/api/tips/special', middleware, (req, res) => {
    res.json(data.special);
})


app.post('/api/auth', (req, res) => {
    let user = data.users.filter((user) => {
        return user.name == req.body.name && user.password == req.body.password;
    });
    // If user exist, then we will run the following command
    if (user.length) {
        let token_payload = {
            name: user[0].name,
            password: user[0].password
        };
        // create a token using user name and password that will be valid for only 2 hours
        let token = jwt.sign(
            token_payload,
            "jwt_secret_password",
            { expiresIn: '2h' }
        );
        let response = {
            message: "Token Created, Authentication is successful",
            token: token
        };
        // we will return the information including token as a JSON
        return res.status(200).json(response);
        // But if no user exists, then we will do this
    } else {
        return res.status("409").json("Authentication failed. Admin is not found.");
    }
})


let post = 5000;
app.listen(post)
console.log("api is running on port "+ post +": ");