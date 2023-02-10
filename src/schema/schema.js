const {buildSchema} = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    debit: Int!
  }
  
  type Room {
    roomId: ID!
    roomName: String!
    members: [User!]!
  }
  
  input UserInput {
    id: ID!
    name: String!
    debit: Int!
  }
  
  input RoomInput {
    roomId: ID
    roomName: String!
    roomPassword: String!
    members: [UserInput!]!
  }
  
  input RoomSignInInput {
    roomId: ID!
    roomPassword: String!
    userInput: UserInput!
  }
  
  input PayMoneyInput {
    roomId: ID!
    userSetterId: ID!
    userGetterId: ID!
    value: Int!
  }
  
  input BuyInput {
    roomId: ID!
    userSetterId: ID!
    membersId: [ID!]!
    value: Int!
  }
  
  type Query {
    getRooms(userId: ID!): [Room]
    getRoom(roomId: ID!): Room
  }
  
  type Mutation {
    createRoom(input: RoomInput!): Room
    roomSignIn(input: RoomSignInInput!): Room
    payMoney(input: PayMoneyInput!): Room
    addBuy(input: BuyInput!): Room
  }
  
`);

module.exports = schema