import {UserModel,ChatBoxModel,MessageModel} from "../db"
const Query = {
  async chatboxs(parent, args, { db }, info) {
      console.log("query "+args.query);
      let c= await ChatBoxModel.findOne({name:args.query});
      
      let l=[];
      for(var x of c.messages){
        let d= await MessageModel.findOne({_id:x});
        l.push(d);
      }
      return l;
  },
};

export { Query as default };
