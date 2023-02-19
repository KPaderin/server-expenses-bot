const mongooseModel = require('./mogooseModel');
const mongoose = require("mongoose");
const logger = require('../../src/dataBase/graphqlLoggerWithDB');

let session
const dbFunc = {
    roomCreate: async (roomName, roomPass, members) => {
        try {
            let room = await mongooseModel.Room.create(
                [{roomName: roomName, roomHashedPass: roomPass, members: members}],
                { session: session }
            )
            room[0].roomId = room[0]['_id'].toString()
            return room[0]
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
            let rooms = await mongooseModel.Room.find({'members.id': userId})
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
                .session(session)
            newRoom.roomId = room['_id'].toString()
            return newRoom
        } catch (e) {
            return e
        }
    },
    withLogger: (root, needLogged) => {
        const handler = {
            get(target, prop) {
                return async function(input) {
                    session = await mongoose.startSession()
                    session.startTransaction()

                    let res
                    try {
                        if(needLogged.find(item => item === prop))
                        {
                            logger(
                                prop,
                                input.input,
                                input.input.roomId,
                                session
                            )
                        }
                        res = await target[prop](input)
                        await session.commitTransaction()
                    }
                    catch (e)
                    {
                        await session.abortTransaction()
                        throw e
                    }
                    finally {
                        session.endSession()
                    }
                    return await res
                }
            },
        };

        return new Proxy(root, handler);
    }

}

module.exports = dbFunc;