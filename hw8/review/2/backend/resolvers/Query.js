
const validateChatBox = async (db, name) => {
    let box = await db.ChatBoxModel.findOne({ name:name });
    if (!box) throw new Error('ChatBox not found');
    return box;
};

const Query = {
    aChatBox(parent, {name}, { db }, info) {
        let box = db.ChatBoxModel.findOne({name:name});
        return box;
    }
}
  
export { Query as default };