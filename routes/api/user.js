const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  }
)

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ Credential: "A user has already registered with this email" })
      }
    })
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        return res.status(400).json({ Credential: "A user has already registered with this username" })
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                };
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({ success: true, token: 'Bearer ' + token, ...payload });
                  });
              })
              .catch(err => console.log(err));
          })
        })
      }
    })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'This user does not exist' });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              username: user.username,
              email: user.email,
              ownedDrawingBoards: user.ownedDrawingBoards,
              joinedDrawingBoards: user.joinedDrawingBoards,
              friends: user.friends
            };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({ success: true, token: 'Bearer ' + token, ...payload });
              }
            );
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        })
    })
})

router.get('/api/users', (req, res) => {
    User.find().then(users => res.json(users))
  }
)

router.post('/api/users',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
  let currUser = User.findOne({ _id: req.user.id })
  currUser.friends.push(req.body.friendId);
  currUser.update();
  res.json(req.body.friendId)
})

router.post('/api/users/:userId', 
passport.authenticate('jwt', { session: false }),
(req,res) => {
  let currentUser = User.findOne({ _id: req.user.id });
  const index = currentUser.friends.indexOf(req.body.friendId);
  currentUser.friends.splice(index, 1);
  currentUser.update();

  res.json(req.body.friendId);
})

module.exports = router;