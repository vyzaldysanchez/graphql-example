const express = require('express');
const graphqlClient = require('express-graphql');
const schema = require('./schema');

const app = express();
const APP_PORT = process.env.APP_PORT || 4000;

app.use(
  '/graphql',
  graphqlClient({
    schema,
    graphiql: true,
  }),
);

app.listen(APP_PORT, () => console.log(`App listening on port ${APP_PORT}`));
