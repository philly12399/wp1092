import Champion from '../models/Champion';
import Match from '../models/Match';
import Summoner from '../models/Summoner'
var addChampion=async(name)=>{
    var s=await Champion.find({"name":name});
    if(s.length===0){
        var property={
            "match_num":0,
            "win_num":0,
            "kill":0,
            "death": 0,
            "assist": 0,
            "damage":0,
            "gold":0,
            "minion":0
        };
        var vm=new Map();
        var champion=new Champion({"name":name,"property":property,"versus":vm});
        await champion.save();
        console.log("Add champion "+name);
        return [champion,"new"];
    }
    else{
        //console.log("Champion "+name+" exist");
        return [s[0],"exist"];
    }  
};
var addMatch=async(m)=>{
    var s=await Match.find({"id":m.id});
    if(s.length===0){
        var match=new Match({...m});
        await match.save();
        console.log("Add match "+m.id);
        return [match,"new"];
    }
    else{
        console.log("Match "+m.id+" exist");
        //console.log(result);
        return [s[0],"exist"];
    }   
};
var addSummoner=async(name)=>{
   
    var s=await Summoner.find({"name":name});
    if(s.length===0){        
        var vm=new Map();
        var summoner=new Summoner({"name":name,"matches":[],"champstats":vm});
        await summoner.save();
        console.log("Add summoner "+name);
        summoner=await summoner.populate('matches').execPopulate();
        return [summoner,"new"];
    }
    else{
        console.log("Summoner "+name+" exist");
        //console.log(result);
        return [await s[0].populate('matches').execPopulate(),"exist"];
    }
};
export {addChampion,addMatch,addSummoner};