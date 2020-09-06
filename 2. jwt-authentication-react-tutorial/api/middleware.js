
const jwt = require('jsonwebtoken');
const JWT_SECRET = "jwt_secret_password";


module.exports = (req, res, next) => {
    // we checking header or url parameters or post parameters for token
    var token = req.body['x-access-token'] 
            || req.query['x-access-token'] 
            || req.headers['x-access-token']; 

    // we will decode token
    if (token) {
        // verifies secret and checks expires
        jwt.verify(token, JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.status(409).send({
                    success: false,
                    message: "Failed to authenticate token."
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token, we will return an error response
        return res.status(403).send({
            success: false,
            message: "No token is provided"
        }); 
    }

};