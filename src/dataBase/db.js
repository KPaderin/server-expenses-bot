const mongoose = require('mongoose');

const mongooseModel = require('./mogooseModel');

const dbFunc = {
    roomCreate: async () => {
        try {
            return await Room.create({roomId: "1", roomName: "test1", roomHashedPass: "1"})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = dbFunc;