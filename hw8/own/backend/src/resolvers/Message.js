import {UserModel} from "../db"
const Message = {  
    async sender(parent, args, { db }, info) {   
        return await UserModel.findOne({ _id:parent.sender});       
    },
    async to(parent, args, { db }, info) {   
        return await UserModel.findOne({ _id:parent.to});   
    },
};
export {Message as default };