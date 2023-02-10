const mongooseModel = require('./mogooseModel');

const dbFunc = {
    roomCreate: async (roomName, roomPass, members) => {
        try {
            let room = await mongooseModel.Room.create(
                {roomName: roomName, roomHashedPass: roomPass, members: members}
            )
            room.roomId = room['_id'].toString()
            return room
        } catch (e) {
            return e
        }
    },
    getRoom: async (roomId) => {
        try {
            let room = await mongooseModel.Room.findById(roomId)
            room.roomId = room['_id'].toString()
            return room
        } catch (e) {
            return e
        }
    },
    getRooms: async (userId) => {
        try {
            let rooms = await mongooseModel.Room.find({'members.id': userId});
            rooms.forEach(room => {room.roomId = room['_id'].toString()})
            return rooms
        } catch (e) {
            return e
        }
    },
    updateRoom: async (room) => {
        try {
            let roomId = room.roomId
            delete room.roomId
            let newRoom = await mongooseModel.Room.findByIdAndUpdate(roomId, room, {new: true})
            newRoom.roomId = room['_id'].toString()
            return newRoom
        } catch (e) {
            return e
        }
    }
}

module.exports = dbFunc;