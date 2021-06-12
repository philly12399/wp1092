import {UserModel,ChatBoxModel,MessageModel} from "../db"
const Query = {
  async chatboxs(parent, args, { db }, info) {
      console.log("query "+args.query);
      let c= await ChatBoxModel.findOne({name:args.query});
      //console.log(c);
      return c;
  },
};

export { Query as default };
