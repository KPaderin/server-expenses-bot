const rooms = require("../data/rooms");
const getNewId = require('../helpers/getNewId')

const errorsList = require("../schema/errorsList")

const dbFunc = require('../dataBase/db')

const createRoom = (input) => {
    const id = getNewId()
    return {...input, roomId: id}
}

const getRoom = (roomId) => {
    dbFunc.roomCreate();
    let res;
    rooms.forEach((room) => {
        if(room.roomId === roomId)
            res = room;
    })
    if(res === undefined)
        throw errorsList.invalidRoomId
    return res;
}

const roomSignIn = (input) => {
    let res = [];
    let room = getRoom(input.roomId)
    if(room.members.filter(member => member.id === input.userInput.id).length !== 0)
        throw errorsList.userAlreadyExist;
    if(room.roomPassword !== input.roomPassword)
        throw errorsList.invalidPassword;
    res = room;
    res.members.push(input.userInput)
    return res
}

const findUserInRoom = (userId, room) => {
    let user = room.members.find((member) => member.id === userId)
    if(!user)
        throw errorsList.userNotExist
    return user
}

const payMoney = (input) => {
    let room = getRoom(input.roomId)

    let userSetter = findUserInRoom(input.userSetterId, room)
    let userGetter = findUserInRoom(input.userGetterId, room)
    userSetter.debit -= input.value
    userGetter.debit += input.value

    return room
}

const addBuy = (input) => {
    let room = getRoom(input.roomId)

    let userSetter = findUserInRoom(input.userSetterId, room)
    let members = input.membersId.map(memberId => findUserInRoom(memberId, room))

    if(!input.membersId.find(id => id === input.userSetterId))
        throw errorsList.userSetterNotFound

    userSetter.debit -= input.value
    members.forEach(member => member.debit += Number(input.value) / input.membersId.length)

    return room
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
        return roomSignIn(input)
    },

    payMoney: ({input}) => {
        return payMoney(input)
    },

    addBuy: ({input}) => {
        return addBuy(input)
    }
}

module.exports = root