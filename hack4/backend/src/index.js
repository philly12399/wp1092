import db from './db';  // see the README for how to manipulate this object
import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
// TODO
// Setup the GraphQL server
// 像 Object 一樣操作它
const collections = db.people;  // 這是個 Array
// 測試過以下這些操作 其他的不確定可不可以
//console.log(collections[1])
//console.log(Object.keys(collections[1]))
/*collections.filter(...)
collections.findIndex(...)
collections.splice(...)
collections.push(...)*/
//console.log(collectoins)
//JSON.stringify(collections)*/
const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
      Query,
      Mutation,    
     // Person,
     // Subscription,
    },
    context: {
      db,
      pubsub,
    },
  });
  
  server.start({ port: process.env.PORT | 5000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 5000}!`);
  });  