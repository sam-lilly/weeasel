const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const drawingBoard = require("../../validation/drawingBoard");

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
                  ownedDrawingBoards: [],
                  joinedDrawingBoards: [],
                  friends: []
                };
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({ success: true, token: 'Bearer ' + token, data: payload });
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

router.get('/', (req, res) => {
  User.find({}, { ownedDrawingBoards: 1, joinedDrawingBoards: 1, friends: 1, online: 1, username: 1, email: 1, createdAt: 1 }).then(users => res.json(users))
}
)

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(currUser => {
      currUser.friends.push(req.body.friendId);
      currUser.save();
    })

    res.json(req.body.friendId)
  })

router.post('/drawingboards/:drawingBoardId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(currUser => {
      currUser.joinedDrawingBoards.push(req.params.drawingBoardId);
      currUser.save();
    })
    DrawingBoard.findById(req.params.drawingBoardId).then(board => {
      board.users.push(req.user.id);
      board.save();
    })

    res.send({ joinedDrawingBoard: req.params.drawingBoardId })
  })

router.delete('/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        const index = user.friends.indexOf(req.body.friendId);
        user.friends.splice(index, 1);
        user.save();
      })
    // let currentUser = User.findOne({ _id: req.user.id });
    // const index = currentUser.friends.indexOf(req.body.friendId);
    // currentUser.friends.splice(index, 1);
    // currentUser.save();

    res.send({ friendId: req.params.userId });
  })

router.delete('/drawingboards/:drawingBoardId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        const index = user.joinedDrawingBoards.indexOf(req.params.drawingBoardId);
        user.joinedDrawingBoards.splice(index, 1);
        user.save();
      })
    DrawingBoard.findById(req.params.drawingBoardId)
      .then(board => {
        const index = board.users.indexOf(req.user.id);
        board.users.splice(index, 1);
        board.save();
      })

    // let currentUser = User.findOne({ _id: req.user.id });
    // const index = currentUser.friends.indexOf(req.body.friendId);
    // currentUser.friends.splice(index, 1);
    // currentUser.save();

    res.send({ drawingBoardId: req.params.drawingBoardId });
  })

module.exports = router;