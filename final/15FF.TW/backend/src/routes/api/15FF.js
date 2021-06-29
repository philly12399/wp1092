import { query, Router } from 'express';
import {getGames} from '../../utils/GarenaStat'
import { query1,query2,query3,query4 } from '../../utils/Query';
import {findChamp} from '../../utils/findChamp';
const router = Router();
router.post('/create-summoner',async function (req, res) {
  try {
    var data=req.body;
    var name=data.name;    
    await getGames(name);   
    res.json({ message: 'Mutaion success.' });
  } catch (e) {
    console.log(e)
    if(e==="Error: The summoner name doesn't exist.")  res.json({ message: "Error: The summoner name doesn't exist." });
    else if(e === "Error: Garena server down.") res.json({ message: "Error: Garena server down." });
    else if (e === "Error: The summoner has no match.") res.json({ message: "Error: The summoner has no match." });
    else if (e === "Error: The summoner name need to be exactly same.") res.json({ message: "Error: The summoner name need to be exactly same." })
    else res.json({ message: 'Mutaion failed.' });
  }
});
router.get('/query1',async function(req,res){
  try {
    var data=req.query; 
    var c1=findChamp(data.champion1);
    var c2=findChamp(data.champion2);
    //console.log(c1+" "+c2);
    var stats=await query1(c1,c2);
    res.json({message:"Query success.",stats:stats});
  } catch (e) {
    console.log(e);
    if(e==="Error: No match between")  res.json({ message: "Error: No match between"});
    else if(e=== "Error: No data of this champion.") res.json({ message:"Error: No data of this champion."});
    else  res.json({ message: 'Query failed.' });
  }
});
router.get('/query2',async function(req,res){
  try{
    var data=req.query; 
    var c=findChamp(data.champion);
    var name=data.name;
    var [stats,used]=await query2(c,name);
    res.json({message:"Query success.",stats:stats,used:used});
  } catch (e) {
    console.log(e);
    if(e=== "Error: No data of this champion.") res.json({ message:"Error: No data of this champion."});
    else res.json({ message: 'Query failed.' });
  }
});
router.get('/query3',async function(req,res){
  try{
    var data=req.query; 
    var name=data.name;
    var match=await query3(name);
    res.json({message:"Query success.",match:match});
  } catch (e) {
    console.log(e);
    res.json({ message: 'Query failed.' });
  }
});
router.get('/query4',async function(req,res){
  try{
    var data=req.query; 
    var c=findChamp(data.champion);
    var name=data.name;
    var stats=await query4(c,name);
    res.json({message:"Query success.",stats:stats});
  } catch (e) {
    console.log(e);
    res.json({ message: 'Query failed.' });
  }
});
export default router;
