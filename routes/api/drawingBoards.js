const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const DrawingBoard = require('../../models/DrawingBoard');
const Easel = require('../../models/Easel');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const validateBoardInput = require('../../validation/drawingBoard');

//fetchDrawingBoards()
router.get('/', (req, res) => {
  DrawingBoard.find()
    .then(boards => res.json(boards))
    .catch(err => res.status(404).json({ error: 'No DrawingBoard found' }));
})


//fetchDrawingBoard(drawingBoardId)
router.get('/:id', (req, res) => {
  DrawingBoard.findById(req.params.id)
    .then(board => res.json(board))
    .catch(err =>
      res.status(404).json({ error: `DrawingBoard ${req.params.id} doesn't exist` })
    );
});

//passport middleware reqObj will have req.user.id = currentUser
//createDrawingBoard(drawingBoard)
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBoardInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors)
    }

    let newDrawingBoard = new DrawingBoard({
      name: req.body.name,
      creator: req.user.id,
    })
    newDrawingBoard.users.push(req.user.id);
    newDrawingBoard.save();
    User.findById(req.user.id)
      .then(user => {
        user.ownedDrawingBoards.push(newDrawingBoard.id)
        user.save();
      });
    res.json(newDrawingBoard.toObject());
  }
)

//-updateDrawingBoard(drawingBoard)
router.put('/:id',
  (req, res) => {
    DrawingBoard.findById(req.params.id)
      .then(board => {
        if (!board) {
          return res.status(404).send({ error: `DrawingBoard ${req.params.id} doesn't exist` })
        }
        Object.assign(board, req.body)
        let updatedBoard = new DrawingBoard(board);
        try {
          updatedBoard.save()
          res.json(updatedBoard)
        } catch (err) {
          res.status(500).send({ error: 'Cannot update this DrawingBoard' })
        }
      })
  }
)

// Finds a matching document, removes it, passing the found document (if any) to the callback.
// we may not user it :-)
router.delete('/:id',
  (req, res) => {
    DrawingBoard.findByIdAndDelete(req.params.id)
      .then(board => {
        if (!board) {
          return res.status(404).send({ error: `DrawingBoard ${req.params.id} doesn't exist` })
        }
        return res.send({ success: 'The DrawingBoard has been successfully deleted' })
      })
      .catch(err => {
        return res.status(500).send({ error: 'Cannot delete this DrawingBoard' })
      })
  }
)


/*=====================================//
//EASEL
//=====================================*/

// -fetchEasels()
router.get('/:id/easels', (req, res) => {
  Easel.find({ drawingBoard: req.params.id })
    .then(easel => res.json(easel))
    .catch(err => res.status(404).json({ error: 'No Easel found' }));
})


// - fetchEasel(EaselId)
// router.get('/:id', (req, res) => {
//   Easel.findById(req.params.id)
//     .then(easel => res.json(easel))
//     .catch(err =>
//       res.status(404).json({ error: `Easel ${req.params.id} doesn't exist` })
//     );
// });

// - createEasel(Easel)
router.post('/:id/easels', (req, res) => {
  const newEasel = new Easel({
    name: req.body.name,
    drawingBoard: req.params.id,
    image: req.body.image
  })

  DrawingBoard.findById(req.params.id)
    .then(board => {
      // res.json(board)
      if (!board) {
        return res.status(404).send({ error: `DrawingBoard ${req.params.id} doesn't exist` })
      }
      newEasel.save();
      board.easels.push(newEasel.id);
      board.save();
    })
  res.json(newEasel.toObject());
})


// - updateEasel(Easel)
router.put('/:board_id/easels/:easel_id', (req, res) => {
  Easel.findById(req.params.easel_id)
    .then(easel => {
      if (!easel) {
        return res.status(404).send({ error: `Easel ${req.params.easel_id} doesn't exist` })
      }
      Object.assign(easel, req.body)
      let updatedEasel = new Easel(easel);
      try {
        updatedEasel.save()
        res.json(updatedEasel)
      } catch (err) {
        res.status(500).send({ error: 'Cannot update this Easel' })
      }
    })
})


// - deleteEasel(EaselId)
router.delete('/:board_id/easels/:easel_id', (req, res) => {
  Easel.findByIdAndDelete(req.params.easel_id)
    .then(easel => {
      if (!easel) {
        return res.status(404).send({ error: `Easel ${req.params.easel_id} doesn't exist` })
      }
      DrawingBoard.update({ _id: req.params.board_id }, { $pull: { easels: req.params.easel_id } })
      // DrawingBoard.findById(req.params.board_id)
      //   .then(board => {
      //     board.easels.pull({ _id: req.params.easel_id })
      //     board.save()
      //   })
      return res.send({ success: 'The Easel has been successfully deleted' })
    })
    .catch(err => {
      return res.status(500).send({ error: 'Cannot delete this Easel' })
    })
})

module.exports = router;


// router.get('/creator/:creator_id', (req, res) => {
//   DrawingBoard.find({ user: req.params.creator_id })
//     .then(boards => res.json(boards))
//     .catch(err => res.status(404).json({ error: 'No DrawingBoards created from the user' }));
// })