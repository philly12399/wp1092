const ChatBox = {
  messages(parent, args, { db }, info) {
    // console.log(parent);
    // return Promise.all(
    //   parent.messages.map((mId) =>
    //     // console.log(mId);
    //     db.MessageModel.findById(mId)
    //   )
    // );
    const id = parent.messages.map((mid) => mid);
    const findId = async () => {
      let data;
      await db.MessageModel.find({ _id: { $in: id } }).then((res) => {
        data = res;
      });
      // console.log(data);
      return data;
    };
    let arr = findId();
    // console.log(res);
    // res[0].body
    return arr;
  },
};

export default ChatBox;
