import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
// import { startDB, models } from './db';
import resolvers from './graphql/resolvers';
import jwt from 'express-jwt';

// const db = startDB({ 
//   user: 'graphql', 
//   pwd: 'yoga123', 
//   db: 'graphqlYoga', 
//   url: 'localhost:27017' 
// })

// const context = {
//   models,
//   db,
// };

const typeDefs = importSchema(`${__dirname}/graphql/schema.graphql`)
const schema = makeExecutableSchema({ typeDefs, resolvers })

const context = async ({ request }) => {
    return { user: request.user }
}

const server = new GraphQLServer({
  schema: schema,
  context: context
});

// options
const opts = {
  port: 4000,
};

server.use(jwt({
    secret: "my-dev-token",
    credentialsRequired: true,
    // getToken: function fromHeaderOrQuerystring (req) {
    //     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    //         return req.headers.authorization.split(' ')[1];
    //     } else if (req.query && req.query.key) {
    //         return req.query.key;
    //     }
    //     return null;
    // }
}));//.unless({path: ['/health']}));

server.start(opts, () => {
  console.log(`Server is running on http://localhost:${opts.port}`);
});