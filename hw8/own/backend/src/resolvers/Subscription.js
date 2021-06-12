import {UserModel,ChatBoxModel,MessageModel} from "../db"
const Subscription = {
    chatbox:{
      async subscribe(parent, args, { db, pubsub }, info) {
        return pubsub.asyncIterator('chatbox');
      },
    },
    message: {
        async subscribe(parent, { chatname }, { db, pubsub }, info) {
          console.log("subscribe "+ chatname);
          const chat= await MessageModel.findOne({ name:chatname});    
          return pubsub.asyncIterator(`message ${chatname}`);
        },
    },
};

export { Subscription as default };
