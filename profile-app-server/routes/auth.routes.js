const router = require('express').Router();

const jwt = require('jsonwebtoken');
const isAuthenticated = require ('../middleware/isAuthenticated')

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require('../models/User.model');

// Require the Token model in order to interact with the database
const Token = require('../models/Token.model');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/verify', (req,res) =>{
  res.json(req.user);
}); 

router.post('/signup', isLoggedOut, (req, res) => {
  const { username, password, campus, course } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide your username.' });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: 'Your password needs to be at least 8 characters long.',
    });
  }

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */

  // Search the database for a user with the username submitted in the form
  User.findOne({ username }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res.status(400).json({ errorMessage: 'Username already taken.' });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          username,
          password: hashedPassword,
          campus,
          course,
        });
      })
      .then(() => {
        return res.status(201).json({ message: `New user created: ${username}` });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              'Username need to be unique. The username you chose is already in use.',
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

router.post('/login', isLoggedOut, async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide your username.' });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: 'Your password needs to be at least 8 characters long.',
    });
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ username })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(400).json({ errorMessage: 'Wrong credentials.' });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: 'Wrong credentials.' });
        }
        // Deconstruct the user object to omit the password
        const { _id, username, campus, course } = user;
        // Create an object that will be set as the token payload
        const payload = { _id, username, campus, course };

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '15s',
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
        Token.create({ token : refreshToken });
        
        // Send the token as the response
        res.status(200).json({ authToken: authToken, refreshToken: refreshToken  });
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.delete('/logout', async (req, res) => {
  const deletedToken = await Token.deleteMany();
  res.status(201).json({ message: `User Logged Out, ${deletedToken.deletedCount} token deleted` });
});

module.exports = router;
