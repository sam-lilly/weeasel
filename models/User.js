
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ownedDrawingBoards: [{
        type: Schema.Types.ObjectId,
        ref: 'DrawingBoard'
    }],
    joinedDrawingBoards: [{
        type: Schema.Types.ObjectId,
        ref: 'DrawingBoard'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

})

User = mongoose.model('User', UserSchema);

module.exports = User;