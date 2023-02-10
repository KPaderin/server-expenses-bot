const mongoose = require("mongoose");

const Room = mongoose.model('Room', mongoose.Schema({
    roomName: {type: String, required: true},
    roomHashedPass: {type: String, required: true},
    members: {type: Array, required: true}
}))

module.exports = {Room}