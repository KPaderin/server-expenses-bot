const {GraphQLError} = require("graphql");

const errorHandler = (errorMessage) => new GraphQLError(errorMessage)

const errorsList = {
    userAlreadyExist: errorHandler("user with this id already exist"),
    invalidPassword: errorHandler("invalid password"),
    invalidRoomId: errorHandler("room with this roomId does not exist"),
    userNotExist: errorHandler("user with this id does not exist"),
    userSetterNotFound: errorHandler("user setter must be in members buy")
}

module.exports = errorsList