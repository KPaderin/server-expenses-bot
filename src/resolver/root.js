const rooms = require("../data/rooms");
const getNewId = require('../helpers/getNewId')

const createRoom = (input) => {
    const id = getNewId()
    return {...input, roomId: id}
}

const getRoom = (roomId) => {
    let res;
    rooms.forEach((room) => {
        if(room.roomId === roomId)
            res = room;
    })
    return res;
}

const roomSignIn = () => {

}

const root = {
    getRooms: ({userId}) => {
        return rooms.filter(room => {
            let isCur = false

            room.members.forEach(user => {
                if (user.id === userId)
                    isCur = true;
            })

            return isCur
        })
    },

    getRoom: ({roomId}) => {
        return getRoom(roomId)
    },

    createRoom: ({input}) => {
        const room = createRoom(input)
        rooms.push(room)
        return room
    },

    roomSignIn: ({input}) => {
        let res = [];
        rooms.forEach(room => {
            if (room.roomName === input.roomName)
            {
                if(room.roomPassword === input.roomPassword)
                {
                    res = room;
                    room.members.push(input.userInput)
                }
            }
        })
        return res
    },

    payMoney: ({input}) => {
        let room;
        rooms.forEach((room1) => {
            if(room1.roomId === input.roomId)
                room = room1;
        })
        room.members.forEach(member => {
            if(member.id === input.userSetterId)
                member.debit -= input.value
            if(member.id === input.userGetterId)
                member.debit += input.value
        })
        return room
    },
    addBuy: ({input}) => {
        let room;
        rooms.forEach((room1) => {
            if(room1.roomId === input.roomId)
                room = room1;
        })
        room.members.forEach(member => {
            if(member.id === input.userSetterId)
                member.debit -= input.value
            input.membersId.forEach(memberId => {
                if(member.id === memberId)
                    member.debit += Number(input.value) / input.membersId.length
            })
        })
        return room
    }
}

module.exports = root