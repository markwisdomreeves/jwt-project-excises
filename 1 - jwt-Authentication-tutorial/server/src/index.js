
require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verify } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { fakeDB } = require("./fakeDB.js");
const { createAccessToken, 
        createRefreshToken,
        sendAccessToken,
        sendRefreshToken 
      } = require("./tokens.js");
const { isAuth } = require("./isAuth.js");

const server = express();

// We are using express middleware for easier cookie handling
server.use(cookieParser());

// using cors here
server.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// This will allow us to read the body data from the server
server.use(express.json()); // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })); // support URL-encoded bodies

// first stat: To Register a user
server.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. we are checking if user the email is the email that is in our database
        const user = fakeDB.find(user => user.email === email);

        /* 2. And if the user email is already in our "database", 
        then we throw an error telling that their already exists */
        if (user) {
            throw new Error("User already exists");
        }
        // 3. if no user exists, then we hash the password
        const hashedPassword = await bcrypt.hashSync(password, 10);
        // 4. add / push / insert the user data into our "database"
        fakeDB.push({
            id: fakeDB.length,
            email,
            password: hashedPassword
        });
        // 5. we send a message the user telling then that a user has been created
        res.send({ message: "User Created" });
        console.log(fakeDB);
        // 6. if not of these happen, and then we has errors, we send an error message 
    } catch (err) {
        res.send({
            error: `${err.message}`
         })
    }
});


// second stat: To Login a user
server.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        /* 1. we need to find the user in our "database".
           And if they don't exist in the database, 
           if they are not logged in our database, 
           them we will send them an error message */
       const user = fakeDB.find(user => user.email === email);

        if (!user) throw new Error("User does not exist");
       
        // 2. compare crypted password and see if it matches.
        const valid = await bcrypt.compareSync(password, user.password);
        // 3. And if they are not, send an error message
        if (!valid)  throw new Error("Invalid Password");
       
        /* 4. But if they are matched or correct, 
            then, we create a RefreshToken and an AccessToken */
        const accessToken = createAccessToken(user.id);
        const refreshToken = createRefreshToken(user.id);
        // 5. we are adding the refreshToken in our "database"
        user.refreshToken = refreshToken;
        console.log(fakeDB);
        /* 6. We will send the RefreshToken as a cookie and we 
        will send the accessToken as a regular response */
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, req, accessToken);

    } catch(err) {
        res.send({
            error: `${err.message}`,
        })
    }
})


// Third stat: To Logout a user
server.post('/logout', (_req, res) => {
    res.clearCookie('refreshtoken', { path: '/refresh_token' });
    return res.send({
        message: 'Logged out',
    });
});


// Fourth stat: To Setup a protected route
server.post('/protected', async(req, res) => {
    try {
        const userId = isAuth(req);
        if (userId !== null) {
            res.send({
                data: "This is a protected data.",
            })
        }
    } catch (err) {
        res.send({
            error: `${err.message}`,
        })
    }
})


// Fifth stat: To Get a new access token with a fresh token
server.post('/refresh_token', (req, res) => {
    const token = req.cookies.refreshtoken;
    // We are checking If we don't have a token in own request
    if (!token) return res.send({ accesstoken: '' });
    // If we have a token, we will verify it!
    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        return res.send({ accesstoken: '' });
    }
    // If the Token is valid, we check if the user is exist in our database
    const user = fakeDB.find(user => user.id === payload.userId);
    if (!user) return res.send({ accesstoken: '' });
    // If the user exist, we check if refreshtoken is exist on the user
    if (user.refreshToken !== token) {
        return res.send({ accesstoken: '' });
    }
    // Then if a Token exist, we will create a new RefreshToken and AccessToken
    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);
    user.refreshtoken = refreshtoken;
    // Then, when everything is okay, we will send a new refreshtoken and accesstoken
    sendRefreshToken(res, refreshtoken);
    return res.send({ accesstoken });
});



server.listen(process.env.PORT, () => 
    console.log(`Server listening on port ${process.env.PORT}`),
);



