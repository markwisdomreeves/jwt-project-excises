
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require("cookie-parser");
const { requireAuth, checkCurrentUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
// connecting and setting up a database using mongoose in a node.js project
const dbURI = 'mongodb+srv://reeves12345:reeves@cluster0.wpqiq.mongodb.net/node-jwt-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log("connection to mongodb database is successful"))
  .catch((err) => console.log(err));

  const port = process.env.PORT || 3000

  app.listen(port, () => console.log(`server is has started on port ${port}`))


// routes
/* we can also add the requireAuth middleware to the home page route
and it will ask user to login first before they can view the page
*/

// we are applying it to every get request routes
app.get('*', checkCurrentUser);

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);



// create a cookies
// app.get("/set-cookies", (req, res) => {
//   res.cookie("newUser", true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
//   res.send("you have created a cookie!");
// })

// read a cookies
// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);

//   res.json(cookies);

// })