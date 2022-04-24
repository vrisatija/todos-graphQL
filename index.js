const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
app.get('/', (req, res) => {
  res.send('Up and running');
});
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
app.listen(4000, () => {
  console.log('running at http://localhost:4000');
});
