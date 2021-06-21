const User = {
  name(parent, args, { db }, info) {
    const fetchUser = async () => {
      let temp;
      await db.UserModel.find({ _id: { $in: parent } }).then((res) => {
        // console.log(res);
        temp = res[0].name;
      });

      // console.log(arr, "jjj");
      return temp;
    };

    const result = fetchUser();

    // console.log("dd", result);
    return result;
  },
  // posts(parent, args, { db }, info) {
  //   return db.posts.filter((post) => {
  //     return post.author === parent.id;
  //   });
  // },
  // comments(parent, args, { db }, info) {
  //   return db.comments.filter((comment) => {
  //     return comment.author === parent.id;
  //   });
  // },
};

export { User as default };
