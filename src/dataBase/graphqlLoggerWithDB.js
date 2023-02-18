const {print} = require("graphql");
const mongooseModel = require('./mogooseModel');

const logger = async (requestInfo) => {
    if(requestInfo.result["errors"] !== undefined)
        return;
    if(requestInfo.result.data.addBuy === undefined
        && requestInfo.result.data.payMoney === undefined)
        return;

    const query = JSON.stringify(print(requestInfo.document))
    const log = {query: query, timeStamp: new Date()}

    let roomId
    if (requestInfo.result.data.payMoney !== undefined)
        roomId = requestInfo.result.data.payMoney.roomId
    else
        roomID = requestInfo.result.data.addBuy.roomId

    try {
        await mongooseModel.RoomLogs.updateOne(
            {'roomId': roomID}, { $push: { logs: log } },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        );
    } catch (e) {
        return "error on saving log"
    }
}

module.exports = logger