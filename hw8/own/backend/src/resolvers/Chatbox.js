import{MessageModel} from "../db"
const ChatBox = {  
    messages(parent, args, { db }, info) {   
        //console.log(parent.messages[0]._id)
        return Promise.all(      
            parent.messages.map((mId) => 
            MessageModel.findOne({ _id:mId._id})          
            ),    
        );  
    },
};
export { ChatBox as default };