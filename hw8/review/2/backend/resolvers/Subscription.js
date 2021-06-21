
const validateChatBox = async (db, name) => {
    let box = await db.ChatBoxModel.findOne({ name:name });
    if (!box) throw new Error('ChatBox not found');
    return box;
};

const Subscription = {
    newMessage: {
        async subscribe(parent, { chatboxName }, { db, pubsub }, info) {
           await validateChatBox(db, chatboxName);
           return pubsub.asyncIterator(`message to ${chatboxName}`);
        },
    },
}
  
export default Subscription;