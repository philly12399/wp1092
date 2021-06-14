import {UserModel,ChatBoxModel,MessageModel} from "../db"
const validateUser= async (name)=>{
  var existing = await UserModel.findOne({ name:name });
  if (!existing){//console.log("create "+name); 
   existing=await new UserModel({ name:name }).save();}
  return existing;
}

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};
const validateChatbox=async (name)=>{
  let box = await ChatBoxModel.findOne({ name:name });
  if (!box) {
    console.log("create chatbox "+name);
    box = await new ChatBoxModel({ name}).save();
  }else{
    console.log("chatbox "+name+" is exist");
  }
  return box
    .populate('users')
    .populate({ path: 'messages', populate: ['sender','to'] })
    .execPopulate();
}
const Mutation = {
  
  async createChatBox(parent,{name1,name2}, { db,pubsub }, info) {
    if (!name1 || !name2) throw new Error ("Missing chatBox name for CreateChatBox");
    await validateUser(name1);
    await validateUser(name2);
    let b=await validateChatbox(makeName(name1,name2));
    //console.log(b);
    pubsub.publish('chatbox', {
      chatbox: {
        mutation: 'CREATED',
        data: b,
      },
    });
    return b;
  },
  async createMessage(parent,{sender,to,body}, { db,pubsub }, info) {
    const key=makeName(sender,to);
    let box = await ChatBoxModel.findOne({ name:key});
    let s1=await validateUser(sender);
    let s2=await validateUser(to);
    console.log(s1);
    console.log(s2);
    let m=new MessageModel({ sender:s1,to:s2,body:body})
    await m.save();   
    box.messages.push(m);
    //console.log(m);
    await box.save();
    pubsub.publish(`message ${key}`,{
      message:{mutation:'CREATED',data:m},
    });
    return m;
  }


};

export { Mutation as default };

  
