const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors')
const mongoose = require('mongoose');
const schema = require('./src/schema/schema.js');
const root = require('./src/resolver/root')
const DB_URL = require('./src/privateConst/dbUrl')
const logger = require('./src/dataBase/graphqlLoggerWithDB')
let port = 3000;

const app = express();
app.use(cors())

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true,
  rootValue: root,
  extensions: logger
}));

app.listen(port);
console.log('GraphQL API server running at localhost:' + port);

const StartApp = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser:true})
  } catch (e) {
    console.log(e)
  }
}

StartApp();