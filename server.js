const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./src/schema.js');
const cors = require('cors')

const root = require('./src/resolver/root')

let port = 3000;
const app = express();
app.use(cors())

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true,
  rootValue: root
}));

app.listen(port);
console.log('GraphQL API server running at localhost:' + port);