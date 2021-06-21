import uuidv4 from 'uuid/v4';


const makeName = (name, to) => {
    return [name, to].sort().join('_');
};


const validateUser = async (db, name) => {
    const existing = await db.UserModel.findOne({ name:name });
    if (existing) return existing;
    return new db.UserModel({ name:name }).save();
};

const validateChatBox = async (db, name) => {
    let box = await db.ChatBoxModel.findOne({ name:name });
    if (!box) box = await new db.ChatBoxModel({ name:name}).save();
    return box;
};


const Mutation = {
    async createChatBox(parent, { name1, name2 },{ db, pubsub }, info){
        if (!name1 || !name2)
            throw new Error("Missing chatBox name for CreateChatBox");
        await validateUser(db, name1);
        await validateUser(db, name2);
        const boxName = makeName(name1, name2);
        return validateChatBox(db,boxName);
    },

    async createMessage(parent, { from, to, body },{ db, pubsub }, info){
        if (!from || !to || !body)
            throw new Error("Missing sender/receiver or missing text");
        let sender = await validateUser(db, from);
        await validateUser(db, to);
        const boxName = makeName(from, to);
        const chatBox = await validateChatBox(db, boxName);
        const newMessage = new db.MessageModel({ sender, body });
        await newMessage.save();
        chatBox.messages.push(newMessage);
        await chatBox.save();
        pubsub.publish(`message to ${boxName}`,{
            newMessage: {data: newMessage, chatboxName: boxName}
        })
        return newMessage;
    }
}


export default Mutation