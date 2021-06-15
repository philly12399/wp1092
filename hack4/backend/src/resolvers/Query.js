const Query = {
    statsCount(parent, args, {collections,pubsub }, info) {
       // console.log(args);
       try{
        var s=[];
        for(var l of args.locationKeywords){
            let a=[];
            
            for(var c of collections){
                let d=c.location.description;
                
                if(d.includes(l)){
                    a.push(c);
                }
            }
            //console.log(a)
            let b=[]
            if(!args.severity){
                //console.log(a.length);
                s.push(a.length);
                continue;
            }
            if(a.length!==0){
            for (var c of a){
                let d=c.severity;
                if(d>=args.severity) b.push(c);
            }}
            s.push(b.length);
        }   
        //console.log(s);
        return s;
    }
    catch(e){return null;}
   
  },
};

export { Query as default };