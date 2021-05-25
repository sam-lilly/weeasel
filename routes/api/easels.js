const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const DrawingBoard = require('../../models/DrawingBoard')
const Easel = require('../../models/Easel')
const passport = require('passport');
const jwt = require('jsonwebtoken');


// -fetchEasels()
router.get('/drawingBoard/:id', (req, res) => {
  Easel.find({ drawingBoard: req.params.id })
    .then(easel => res.json(easel))
    .catch(err => res.status(404).json({ error: 'No Easel found' }));
})

// // - fetchEasel(EaselId)
// router.get('/:id', (req, res) => {
//   Easel.findById(req.params.id)
//     .then(easel => res.json(easel))
//     .catch(err =>
//       res.status(404).json({ error: `Easel ${req.params.id} doesn't exist` })
//     );
// });

// - createEasel(Easel)


// - updateEasel(Easel)
// - deleteEasel(EaselId)

module.exports = router;