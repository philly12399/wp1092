const axios = require('axios');
const fs = require('fs');
var baseuri = "https://acs-garena.leagueoflegends.com/v1/";
var key2Champ=JSON.parse(fs.readFileSync('./files/key2Champion.json','utf8'));

var getData=async(name)=>{
    var uid = await getUid(name);
    var recentMatchesIds = await getRecentMatchesIds(uid);
    if(recentMatchesIds.length===0) throw "Error: The summoner has no match."
    var Matches=[];
    for(var gid of recentMatchesIds){
        Matches.push(await getMatch(gid));
    }
    if(!Matches[0].summoners.includes(name)){
         throw "Error: The summoner name need to be exactly same.";
    }
    return Matches;
}
var getUid=async (name)=>{
    if(name.length<=2) throw "Error: The summoner name doesn't exist."
    var uri = baseuri +"players?name="+encodeURIComponent(name)+"&region=TW";
    //console.log(uri);
    try{
        var res=await axios.get(uri);
    }catch(e){
        if(e.response!==undefined){
         if(e.response.statusText ==='Not Found') throw "Error: The summoner name doesn't exist."
        }
        throw e;
    }
    var uid = res.data.accountId;
    return uid;
}
var getRecentMatchesIds=async(uid)=>{
    var uri = baseuri +"stats/player_history/TW/"+uid;
    //console.log(uri);
    var res=await axios.get(uri);
    //console.log(res.data);
    var games = res.data.games.games;
    var matchIds=[];
    for (var g of games)
        matchIds.push(g.gameId);
    return matchIds;
}
var getMatch=async(gameId)=>{
    var uri = baseuri + "stats/game/TW/"+gameId;
    //console.log(uri);
    var res=await axios.get(uri);
    return parseMatch(res.data);    
}
var parseMatch=(m)=>{
    var match ={};
    match.stats=getStats(m.participants);
    match.id = m.gameId.toString();
    match.gamemap = mode2Map(m.gameMode);
    match.gamemode = mode2Map(m.gameMode);
    match.gametime = sec2Time(m.gameDuration);
    match.time = "no data";
    match.champions=[];
    match.order=((m.teams[0]).win ==='Win')?  ["win","lose"]:["lose","win"];
    match.summoners=[];
    for(var p of m.participants){
        match.champions.push(mapChamp(p.championId));
    }
    for(var p of m.participantIdentities){
        match.summoners.push(p.player.summonerName);
    }
    
    return match;
}
var mapChamp=(key)=>{
   if(key2Champ[key]!==undefined) return key2Champ[key];  
   return "newChamp"; 
}
var mode2Map=(mode)=>{
    var gameMap='其他';
    if(mode ==='CLASSIC') gameMap ='召喚峽谷'
    else if(mode ==='ARAM') gameMap='咆哮深淵'
    else if(mode ==='NEXUSBLITZ') gameMap='閃電急擊'
    return gameMap;
}
var sec2Time=(sec)=>{
    var m=parseInt(sec/60)+':';
    var s=parseInt(sec%60);
    if(s<10) s='0'+s;
    return m+s;
}
var getStats=(p)=>{
    var stats=[];
    for(var x of p){
        var s=x.stats;
        var obj={};
        obj["CHAMPIONS_KILLED"]=s.kills;
        obj["NUM_DEATHS"]=s.deaths;
        obj["ASSISTS"]=s.assists;
        obj["TOTAL_DAMAGE_DEALT_TO_CHAMPIONS"]=s.totalDamageDealtToChampions;
        obj["GOLD_EARNED"]=s.goldEarned;
        obj["MINIONS_KILLED"]=s.totalMinionsKilled;
        obj["NEUTRAL_MINIONS_KILLED"]=s.neutralMinionsKilled;
        obj["LEVEL"]=s.champLevel;
        stats.push(obj);
    }   
    return stats;
}
export {getData};