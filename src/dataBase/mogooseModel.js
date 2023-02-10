const mongoose = require("mongoose");

const Room = mongoose.model('Room', mongoose.Schema({
    roomId: {type: String, required: true},
    roomName: {type: String, required: true},
    roomHashedPass: {type: String, required: true}
}))

module.exports = {Room}