const mongooseModel = require('./mogooseModel');

const logger = async (reqType, request, roomId, session) => {
    const query = JSON.stringify(request)
    const log = {query: {[reqType]: query}, timeStamp: new Date()}

    await mongooseModel.RoomLogs.updateOne(
        {'roomId': roomId}, { $push: { logs: log } },
        {new: true, upsert: true, setDefaultsOnInsert: true, session: session}
    );
}

module.exports = logger