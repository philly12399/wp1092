import { query, Router } from 'express';
import ScoreCard from '../../models/ScoreCard';
import mongo from '../../mongo';
const router = Router();
var lsdb=()=>{
  ScoreCard.find().exec((err, res) => {console.log(res);})
}
var clearall=()=>{
  ScoreCard.deleteMany({}, () => {
    var str="Database cleared";
    console.log(str);
  });
}
var x=1;
var checkin= (name,subject,score,res)=>{
  //lsdb();
  const scorecard = new ScoreCard({ name, subject, score });
  ScoreCard.find({"name":name,"subject":subject}).exec((err, result) => {
    var s;
    if(result.length===0){
      try{
        scorecard.save();
        s='Adding ('+name+', '+subject+', '+score+')';
        
      } catch (e) {  throw new Error      
       ("ScoreCard DB save error: " + e);
      }      
    }
    else{
      ScoreCard.updateOne({"name":name,"subject":subject},{"score":score},()=>{})
      s='Updating ('+name+', '+subject+', '+score+')';
    }
    res.json({message:s,card:scorecard});
  })
}
router.post('/create-card', function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    var data=req.body;
    var name=data.name;    
    var subject=data.subject;
    var score=data.score;
    checkin(name,subject,score,res); 
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
router.delete('/delete',async function(req,res){
  await clearall();
  res.json({ message: 'Database cleared'})
});

// TODO: implement the DB query
router.get('/query',async function(req,res){
  //console.log(req.query);
  var data=req.query;
  var type=data.queryType;  
  var str=data.queryString;
  var query={};
  query[type]=str;
  ScoreCard.find(query).exec((err, result) => {
    var s;
    var arr=[];
    if (err) throw err
    if(result.length===0){
      s=type+' ('+str+') not found!';  
      arr.push(s);      
    }
    else{
      for(let i=0;i<result.length;i++){
        s="Name: "+result[i].name+" Subject: "+result[i].subject+" Score: "+result[i].score+"\n";
        arr.push(s);
      }      
    }
    res.json({ messages:arr , message:arr});
    
  })
});


export default router;
