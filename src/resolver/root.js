const md5 = require('md5');

const errorsList = require("../schema/errorsList")
const dbFunc = require('../dataBase/db')

const createRoom = async (input) => {
    return await dbFunc.roomCreate(input.roomName, md5(input.roomPassword), input.members);
}

const getRoom = async (roomId) => {
    return await dbFunc.getRoom(roomId)
}

const roomSignIn = async (input) => {
    let room = await getRoom(input.roomId)
    if(room.members.find(member => member.id === input.userInput.id))
        throw errorsList.userAlreadyExist;
    if(room.roomHashedPass !== md5(input.roomPassword))
        throw errorsList.invalidPassword;
    room.members.push(input.userInput)
    return await dbFunc.updateRoom(room)
}

const roomSignOut = async (input) => {
    let room = await getRoom(input.roomId)
    let user = room.members.find(member => member.id === input.userId);

    if(!user)
        throw errorsList.userNotExist;
    if(user.debit !== 0)
        throw errorsList.debitNotZero;

    room.members = room.members.filter(member => member.id !== input.userId)
    return await dbFunc.updateRoom(room)
}

const findUserInRoom = (userId, room) => {
    let user = room.members.find((member) => member.id === userId)
    if(!user)
        throw errorsList.userNotExist
    return user
}

const payMoney = async (input) => {
    let room = await getRoom(input.roomId)

    let userSetter = findUserInRoom(input.userSetterId, room)
    let userGetter = findUserInRoom(input.userGetterId, room)
    userSetter.debit -= input.value
    userGetter.debit += input.value

    return await dbFunc.updateRoom(room)
}

const addBuy = async (input) => {
    let room = await getRoom(input.roomId)

    let userSetter = findUserInRoom(input.userSetterId, room)
    let members = input.membersId.map(memberId => findUserInRoom(memberId, room))

    if(!input.membersId.find(id => id === input.userSetterId))
        throw errorsList.userSetterNotFound

    userSetter.debit -= input.value
    members.forEach(member => member.debit += Number(input.value) / input.membersId.length)

    return await dbFunc.updateRoom(room)
}

const getRooms = async (userId) => {
    return await dbFunc.getRooms(userId)
}

let root = {
    getRooms: async ({userId}) => {
        return await getRooms(userId)
    },

    getRoom: async ({roomId}) => {
        return await getRoom(roomId)
    },

    createRoom: async ({input}) => {
        return await createRoom(input)
    },

    roomSignIn: async ({input}) => {
        return await roomSignIn(input)
    },

    roomSignOut: async ({input}) => {
        return await roomSignOut(input)
    },

    payMoney: async ({input}) => {
        return await payMoney(input)
    },

    addBuy: async ({input}) => {
        return await addBuy(input)
    }
}
const needLogged = ['payMoney', 'addBuy']

root = dbFunc.withLogger(root, needLogged)

module.exports = root