const md5 = require('md5');

const errorsList = require("../schema/errorsList")
const dbFunc = require('../dataBase/db')

const createRoom = (input) => {
    return dbFunc.roomCreate(input.roomName, md5(input.roomPassword), input.members);
}

const getRoom = (roomId) => {
    return dbFunc.getRoom(roomId)
}

const roomSignIn = (input) => {
    let room = getRoom(input.roomId)
    if(room.members.filter(member => member.id === input.userInput.id).length !== 0)
        throw errorsList.userAlreadyExist;
    if(room.roomHashedPass !== md5(input.roomPassword))
        throw errorsList.invalidPassword;
    room.members.push(input.userInput)
    return dbFunc.updateRoom(room)
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

    return dbFunc.updateRoom(room)
}

const addBuy = (input) => {
    let room = getRoom(input.roomId)

    let userSetter = findUserInRoom(input.userSetterId, room)
    let members = input.membersId.map(memberId => findUserInRoom(memberId, room))

    if(!input.membersId.find(id => id === input.userSetterId))
        throw errorsList.userSetterNotFound

    userSetter.debit -= input.value
    members.forEach(member => member.debit += Number(input.value) / input.membersId.length)

    return dbFunc.updateRoom(room)
}

const getRooms = (userId) => {
    return dbFunc.getRooms(userId)
}

const root = {
    getRooms: ({userId}) => {
        return getRooms(userId)
    },

    getRoom: ({roomId}) => {
        return getRoom(roomId)
    },

    createRoom: ({input}) => {
        return createRoom(input)
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