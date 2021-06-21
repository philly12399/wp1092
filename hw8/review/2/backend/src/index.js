import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from '../resolvers/Query';
import Mutation from '../resolvers/Mutation';
import Subscription from '../resolvers/Subscription';
import ChatBox from '../resolvers/ChatBox';
import Message from '../resolvers/Message';

const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const path = require('path');
const uuid = require('uuid');
require('dotenv-defaults').config();
const mongo = require('./mongo');

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    ChatBox,
    Message,
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});


