import express from 'express';

import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import isEmail from 'isemail';

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
  }),

  // Set user context in every request
  context: async ( { req } ) => {
    // Simple auth check in every request
    const auth = req.headers && req.headers.authorization || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');
    if ( !isEmail.validate(email) ) return { user: null }

    // find a user by their email
    const [ user, _ ] = await store.users.findOrCreate({ where: { email } });
    if(user){
      return { user: { ...user.dataValues } }
    } else{
      return { user: null }
    }
  }

})
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen(
  { port: 3000 },
  () => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`)
);
