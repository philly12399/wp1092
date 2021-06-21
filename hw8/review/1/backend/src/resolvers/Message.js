const Message = {
  sender(parent, args, { db }, info) {
    console.log(parent, "qqq");
    return parent;
  },
  body(parent, args, { db }, info) {
    let arr = [];
    console.log(parent, "ooo");
    for (let i = 0; i < parent.length; i++) {
      arr.push(parent[i].body);
    }
    return arr;
  },
};
