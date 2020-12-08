import express from 'express';

import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';

import { createStore } from './db';
import  typeDefs  from './schema';
import { LaunchAPI} from './datasources/launch';
import { UserAPI } from './datasources/user';
import resolvers from './resolvers';

const app = express();
const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
})
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen(
  { port: 3000 },
  () => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`)
);
