const getNewId = ()  => Date.now().toString() + Math.floor(Math.random()*10000)

module.exports = getNewId