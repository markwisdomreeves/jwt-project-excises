

require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt.js');
const errorHandler = require('./_helpers/error-handler.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


// we are using the JWT Authentication to secure the API
app.use(jwt());

// this is the api routes
app.use('/users', require('./users/users.controller'));

// this is the global error handler
app.use(errorHandler());


// we are starting the server
const port = precess.env.NODE_ENV === 'production' ? 80 : 40000;
app.listen(port, function() {
    console.log('Server listening on port ' + port);
})