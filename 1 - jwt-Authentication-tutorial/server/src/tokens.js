
const { sign } = require("jsonwebtoken");


// we are creating our AccessToken: This is how you create AccessToken
const createAccessToken = userId => {
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    })
};

// we are creating our RefreshToken: This is how you create RefreshToken
const createRefreshToken = userId => {
    return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    })
};

// send the AccessToken as a regular response
const sendAccessToken = (res, req, accesstoken) => {
    res.send({
        accesstoken,
        email: req.body.email,
    })
}

// send the RefreshToken as a cookie
const sendRefreshToken = (res, refreshtoken) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/refresh_token',
    })
}


module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}