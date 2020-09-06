

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // we return our custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // we return the jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // finally, we return the default to 500 server error
    return res.status(500).json({ message: err.message })
}
