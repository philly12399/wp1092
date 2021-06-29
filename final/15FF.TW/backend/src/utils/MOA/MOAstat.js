import encode from './encode'
import {parseRecentMatches,parseMatchIds,parseMatch} from './parse_html'
import {dbMutation,dbClear, dbInitialize} from './Mutation'
import {readjson,writejson,createLog,writeLog} from './readwrite'
import {getIDs} from './getManyAccount'
import{addSummoner} from './addObj';
const baseurl="https://lol.moa.tw"
const axios = require('axios');
var addDataFlow=async (summoner_name)=>{
    console.log("get summoner "+summoner_name);
    var ajax_url=await getSummoner(summoner_name); 
    var match_ids=await getMatchId(ajax_url);
    
    if(match_ids.length > 0){
        var matches=[];
        for(var id of match_ids)
            matches.push(await getMatch(id));
        return matches;
    }else {
        throw "Error: The summoner has no match."
    }
   
}
var getGames= async (summoner_name)=>{ 
    try{
        await addSummoner(summoner_name);
        //var matches =await addDataFlow(summoner_name);
        
    }
    catch(e){  
        console.log(e);
        if (e === "Error: The summoner name doesn't exist.") throw "Error: The summoner name doesn't exist."
        else if(e==="Error: The summoner has no match.") throw "Error: The summoner has no match."
        throw "Error: MOA server down."
    }  /*
    try{
        //await dbMutation(summoner_name,[await getMatch("1936320920")])
        await dbMutation(summoner_name,matches);
        console.log("Mutation sucess.")
    } catch(e){
        if(e=== "Error: No data of this champion.") throw "Error: No data of this champion."
        else throw "Error: Mutaion error.";
    }  */
    
}
var getSummoner=async (summoner_name)=>{
    try{
        var url=baseurl+'/summoner/show/'+encode(summoner_name);
        var res=await axios.get(url);
        //console.log("get 1")
        var data = parseRecentMatches(res.data,summoner_name)
        if(data === null) throw "Error: The summoner name doesn't exist."
        return data+"/"+encode(summoner_name); 
    }
    catch(e){
        if (e==="Error: The summoner name doesn't exist.")throw "Error: The summoner name doesn't exist."
        throw e;
    }
}
var getMatchId=async (ajax_url)=>{ 
    var url=baseurl+ajax_url;
    //console.log(url);   
    var res=await axios.get(url);
    //console.log("get 2")
    //console.log(res.data);
    return  parseMatchIds(res.data); 
}
var getMatch=async(match_id)=>{
    var url=baseurl+'/match/show/'+match_id;
    var res=await axios.get(url);
    //console.log("get 3")
    var match=parseMatch(res.data,match_id); 
    return match;
}
export  {getGames,addDataFlow};