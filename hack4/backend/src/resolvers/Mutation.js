const Mutation = {
  insertPeople(parent, args, { db }, info) {
      var collections=db.people;
    try{
    for(var p of args.data){
       // console.log("l="+collections.length)
        var flag=false;
        for(var c of collections){
            if(p.ssn===c.ssn){
               // console.log("renew to");
                flag=true;
                c.name=p.name;
                c.severity=p.severity;
                c.location=p.location;
               // console.log(c);
                break;
            }
        }
        if(flag) continue;
        var newp={ssn:p.ssn,name:p.name,severity:p.severity,location:p.location};
        //console.log("push");
        
        collections.push(newp);
    }
    return true;
    }
    catch(e){return false;}
   
  },
};
export { Mutation as default };