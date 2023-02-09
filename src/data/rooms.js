const user = (id) => ({
    id: id,
    name: 'petr',
    debit: 0
})

const room = (id)  => ({
    roomId: id.toString(),
    roomName: id.toString(),
    roomPassword: 'pass',
    members: [user("1"), user("2")]
})

const rooms = [room(1), room(2)]

module.exports = rooms;