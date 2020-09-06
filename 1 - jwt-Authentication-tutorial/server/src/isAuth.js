
const { verify } = require('jsonwebtoken');


const isAuth = req => {
    const authorization = req.headers['authorization'];
    if (!authorization) throw new Error("You need to login");
    // then we get the first token from the array like this:
    // 'Bearer  g2hsdget3u4gdjsgdheyueyehdjusu2134'
    const token = authorization.split(' ')[1];
    const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
    return userId;
}


module.exports = {
    isAuth
}