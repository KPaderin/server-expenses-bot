const mongooseModel = require('./mogooseModel');

const logger = async (reqType, request, roomId, session) => {
    const query = JSON.stringify(request)
    const log = {query: {[reqType]: query}, timeStamp: new Date()}
    console.log(log)
    try {
        await mongooseModel.RoomLogs.updateOne(
            {'roomId': roomId}, { $push: { logs: log } },
            {new: true, upsert: true, setDefaultsOnInsert: true, session: session}
        );
    } catch (e) {
        return "error on saving log"
    }
}

module.exports = logger