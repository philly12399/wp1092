import { ObjectId } from "mongodb";

const Message = {
    sender(parent, args, { db }, info) {
        return db.UserModel.findById(parent.sender);
    },
};
export default Message;