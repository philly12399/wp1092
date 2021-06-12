import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Message from './resolvers/Message';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Chatbox from './resolvers/Chatbox';
const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env.MONGO_URL)
function connectMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Mongo database connected!');
  });
}
const mongo = {
  connect: connectMongo,
};
mongo.connect();
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,    
    Chatbox,
    Message,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
