const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
  me() {
    return {
      id: "123098",
      name: "Mike",
      email: "mike@example.com",
    };
  },
  post() {
    return {
      id: "092",
      title: "GraphQL 101",
      body: "",
      published: false,
    };
  },
  async chatbox(parent, { me, friend }, { db, pubsub }, info) {
    // console.log(db);
    const checkUser = async (db, friend) => {
      return await db.UserModel.findOne({ name: friend });
    };
    const newUser = (friend) => {
      return new db.UserModel({ friend }).save();
    };
    const validateChatBox = async (name) => {
      let box = await db.ChatBoxModel.findOne({ name });
      if (!box) box = await new db.ChatBoxModel({ name }).save();

      return box;
      // .populate({ path: "messages", populate: "sender" })
      // .execPopulate();
    };
    if (!me || !friend) {
      throw new Error("Missing chatBox name for CreateChatBox");
    }

    if (!(await checkUser(db, friend))) {
      console.log(checkUser(db, friend));
      console.log("User does't exist for createChatBox:: " + friend);
      // await newUser(friend);
    }

    const chatRecord = validateChatBox(makeName(me, friend));
    chatRecord.then((res) => console.log(res));
    // ._id
    pubsub.publish(`chat ${chatRecod._id}`, {
      chatbox: {
        data: chatRecord,
      },
    });
    return chatRecord;
  },
};

export { Query as default };
