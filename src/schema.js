const {buildSchema} = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID
    name: String
    debit: Float
  }
  
  type Room {
    roomId: ID
    roomName: String
    roomPassword: String
    members: [User]
  }
  
  input UserInput {
    id: ID!
    name: String!
    debit: Float!
  }
  
  input RoomInput {
    roomId: ID
    roomName: String!
    roomPassword: String!
    members: [UserInput]!
  }
  
  input RoomSignIn {
    roomName: String!
    roomPassword: String!
    userInput: UserInput!
  }
  
  input PayMoneyInput {
    roomId: ID!
    userSetterId: ID!
    userGetterId: ID!
    value: Float!
  }
  
  input BuyInput {
    roomId: ID!
    userSetterId: ID!
    membersId: [ID]!
    value: Float!
  }
  
  type Query {
    getRooms(userId: ID!): [Room]
    getRoom(roomId: ID!): Room
  }
  
  type Mutation {
    createRoom(input: RoomInput!): Room
    roomSignIn(input: RoomSignIn!): Room
    payMoney(input: PayMoneyInput!): Room
    addBuy(input: BuyInput!): Room
  }
  
`);

module.exports = schema