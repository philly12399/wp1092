import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";
import ChatBox from "./resolvers/ChatBox";
import mongo from "./mongo";
const pubsub = new PubSub();

console.log(db, "hiii");
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
    ChatBox,
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

///
// const mongoose = require("mongoose");
// const http = require("http");
// const WebSocket = require("ws");
// const express = require("express");
// const path = require("path");
// const uuid = require("uuid");

/* -------------------------------------------------------------------------- */
/*                                  UTILITIES                                 */
/* -------------------------------------------------------------------------- */
const makeName = (name, to) => {
  return [name, to].sort().join("_");
};

/* -------------------------------------------------------------------------- */
/*                            SERVER INITIALIZATION                           */
/* -------------------------------------------------------------------------- */
// const server = http.createServer(app);

// const wss = new WebSocket.Server({
//   server,
// });

// app.use(express.static(path.join(__dirname, "public")));

// const validateUser = async (name) => {
//   const existing = await UserModel.findOne({ name });
//   if (existing) return existing;
//   return new UserModel({ name }).save();
// };

// const validateChatBox = async (name, participants) => {
//   let box = await ChatBoxModel.findOne({ name });
//   // console.log(box);
//   if (!box) box = await new ChatBoxModel({ name, users: participants }).save();
//   return box
//     .populate("users")
//     .populate({ path: "messages", populate: "sender" })
//     .execPopulate();
// };

// // (async () => {
// //   const a = await validateUser('a');
// //   const b = await validateUser('b');

// //   console.log(a);

// //   const cbName = makeName('a', 'b');

// //   const chatBox = await validateChatBox(cbName, [a, b]);

// //   console.log(chatBox);
// // })();

// const chatBoxes = {}; // keep track of all open AND active chat boxes

// wss.on("connection", function connection(client) {
//   client.id = uuid.v4();
//   client.box = ""; // keep track of client's CURRENT chat box

//   client.sendEvent = (e) => client.send(JSON.stringify(e));

//   client.on("message", async function incoming(message) {
//     message = JSON.parse(message);

//     const { type } = message;

//     switch (type) {
//       // on open chat box
//       case "CHAT": {
//         const {
//           data: { name, to },
//         } = message;

//         const chatBoxName = makeName(name, to);

//         const sender = await validateUser(name);
//         const receiver = await validateUser(to);
//         const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

//         // if client was in a chat box, remove that.
//         if (chatBoxes[client.box]) {
//           console.log(chatBoxes);
//           // user was in another chat box
//           chatBoxes[client.box].delete(client);
//         }
//         // use set to avoid duplicates
//         client.box = chatBoxName;
//         if (!chatBoxes[chatBoxName]) chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
//         chatBoxes[chatBoxName].add(client); // add this open connection into chat box

//         client.sendEvent({
//           type: "CHAT",
//           data: {
//             messages: chatBox.messages.map(({ sender: { name }, body }) => ({
//               name,
//               body,
//             })),
//           },
//         });

//         break;
//       }

//       case "MESSAGE": {
//         const {
//           data: { name, to, body },
//         } = message;

//         const chatBoxName = makeName(name, to);

//         const sender = await validateUser(name);
//         const receiver = await validateUser(to);
//         const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

//         const newMessage = new MessageModel({ sender, body });
//         await newMessage.save();

//         chatBox.messages.push(newMessage);
//         await chatBox.save();

//         chatBoxes[chatBoxName].forEach((client) => {
//           client.sendEvent({
//             type: "MESSAGE",
//             data: {
//               message: {
//                 name,
//                 body,
//               },
//             },
//           });
//         });
//       }
//     }

//     // disconnected
//     client.once("close", () => {
//       chatBoxes[client.box].delete(client);
//     });
//   });
// });
