import express from 'express';

import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
const app = express();

/** Apollo Graphql setup starts
 * @see https://medium.com/@th.guibert/basic-apollo-express-graphql-api-with-typescript-2ee021dea2c
* Comment this to switch to normal express graphql */
const server = new ApolloServer({
  schema,
  //validationRules: [depthLimit[7]],
})
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen(
  { port: 3000 },
  () => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
/* Apollo Graphql setup ends */


/* Uncomment this for express-graphql way
const root = { message: () => 'Hello world' };
import { graphqlHTTP } from 'express-graphql';
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))
app.listen(
  3000,
  () => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
)
*/

