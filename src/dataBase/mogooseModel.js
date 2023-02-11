const mongoose = require("mongoose");

const Room = mongoose.model('Room', mongoose.Schema({
    roomName: {type: String, required: true},
    roomHashedPass: {type: String, required: true},
    members: {type: Array, required: true}
}))

const RoomLogs = mongoose.model('RoomLogs', mongoose.Schema({
    roomId: {type: String, required: true},
    logs: {type: Array, default:[], required: true}
}))

module.exports = {Room, RoomLogs}