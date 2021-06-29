import Champion from '../models/Champion';
import Match from '../models/Match';
import Summoner from '../models/Summoner'
import {addChampion,addMatch,addSummoner} from './addObj'
import {readjson,writejson} from './readwrite'
import { findname } from './Query';
import {champs} from './findChamp';
import { addDataFlow } from './GarenaStat';
var dbInitialize=async()=>{
    for(var c of champs){
        addChampion(c);
    }
    var ids = await readjson('./files/ids/ids.json');
    var c=0;
    var suc=0;
    for(var id of ids){
        console.log(c);    
        for(var t=0;t<3;t++){
            try{
                var matches = await addDataFlow(id);
                if(matches.length>0)
                    await dbMutation(id,matches);
                suc++;
                break;
            }catch(e){
                continue;
            }
        }
        c++;
    }
    console.log("add "+ suc+" / "+c);
}
var dbMutation= async (summoner_name,matches)=>{
    
    
    var [summoner,flag1]= await addSummoner(summoner_name);
    var m_list=[...summoner.matches]
    var c_map=new Map(summoner.champstats);  
    var changed=false;
    for(var m of matches){
        var [match,flag2]=await addMatch(m);
        if(flag2 === "new"){
           renewChampions(m);
        }
        var f=false;
        for(var i=0;i<m_list.length;i++){
            //console.log(m_list[i].id+" "+m.id);
            if(m_list[i].id===m.id){f=true; break;}
        }
        if(!f) {
            changed=true
            await renewSummonerChampstats(m,summoner,c_map);
            m_list.push(match); 
        }     

    }
    //console.log(c_map);
    if(changed){
        var suc=false;
        for(var t=0;t<6;t++){
            var x=await Summoner.updateOne({"name":summoner_name},{"matches":m_list,"champstats":c_map});
            if(x.nModified!==0){suc=true; break;}      
        }
        if(suc==false) throw "Error: Renew summoner failed."
    }
}
var renewSummonerChampstats=async(m,s,c_map)=>{
    var ind =findname(m,s.name);
    var stats=m.stats[ind];
    var key=m.champions[ind];
   // console.log(ind+" "+key);
    var o={
    "match_num":0,"win_num":0,"kill":0,
    "death":0,"assist":0,"gold":0,"minion":0,"damage":0};
    //console.log("renew "+s.name+" "+key);
    if(c_map.has(key)) o=c_map.get(key);
    var t=parseInt(ind/5);
    var w=(m.order[t]==="win")? 1:0;
    o.match_num+=1;
    o.win_num+=w;
    o.kill+=stats.CHAMPIONS_KILLED;
    o.death+=stats.NUM_DEATHS;
    o.assist+=stats.ASSISTS;
    o.damage+=stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS;
    o.gold+=stats.GOLD_EARNED;
    o.minion+=(stats.MINIONS_KILLED+stats.NEUTRAL_MINIONS_KILLED);
    c_map.set(key,o);
    
}
var renewChampions=async (m)=>{
   // console.log(m.summoners)
    var l=m.champions.length;
    var blue=m.champions.slice(0,l/2);
    var red=m.champions.slice(l/2);
    var team=[blue,red];
    var win=[1,0];
    if(m.order[0]==="lose") win=[0,1];
    try{
    for(var t=0;t<2;t++){
        var enemy=(t+1)%2;
        for(var i=0;i<l/2;i++){
            var ind=5*t+i;
            var stats=m.stats[ind];
            var [c,flag3]= await addChampion(team[t][i]);
            var p={...c.property};
            var vs=new Map(c.versus);
            //console.log(vs)
            p.match_num+=1;
            p.win_num+=win[t];
            p.kill+=stats.CHAMPIONS_KILLED;
            p.death+=stats.NUM_DEATHS;
            p.assist+=stats.ASSISTS;
            p.damage+=stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS;
            p.gold+=stats.GOLD_EARNED;
            p.minion+=(stats.MINIONS_KILLED+stats.NEUTRAL_MINIONS_KILLED);
            for(var j=0;j<l/2;j++){
                var key=team[enemy][j];
                var enemy_ind=5*enemy+j;
                var vs_p={"versus_name":key,"match_num":[0,0],"win_num":[0,0],"kill":[0,0],
                            "death":[0,0],"assist":[0,0],"gold":[0,0],"minion":[0,0],"damage":[0,0]}
                if(vs.has(key)){
                    //console.log("has");
                    vs_p=vs.get(key);
                }
                //console.log(vs_p);
                for(var k=0;k<2;k++){
                    var ti=(k===0)? ind:enemy_ind;
                    var stats_1=m.stats[ti];
                    vs_p.match_num[k]+=1;
                    vs_p.win_num[k]+=win[parseInt(ti/(l/2))];
                    vs_p.kill[k]+=stats_1.CHAMPIONS_KILLED;
                    vs_p.death[k]+=stats_1.NUM_DEATHS;
                    vs_p.assist[k]+=stats_1.ASSISTS;
                    vs_p.gold[k]+=stats_1.GOLD_EARNED;
                    vs_p.minion[k]+=(stats_1.MINIONS_KILLED+stats_1.NEUTRAL_MINIONS_KILLED);
                    vs_p.damage[k]+=stats_1.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS
                }
                //console.log(vs_p)
                vs.set(key,vs_p);
            }
            var suc=false;
            for(var u=0;u<6;u++){
                var x=await Champion.updateOne({"name":team[t][i]},{"property":p,"versus":vs});
                if(x.nModified!==0){suc=true; break;}      
            }
            if(suc==false) throw "Error: Renew champion failed."
        }
    } }
    catch(e){console.log(e); throw e;}
}
var dbClear=async ()=>{
    await Match.deleteMany({}, () => {
        console.log("Match cleared");
    });
    await Summoner.deleteMany({}, () => {
        console.log("Summoner cleared");
    });
    await Champion.deleteMany({}, () => {
        console.log("Champion cleared");
    });

    await dbInitialize();
}
export {dbMutation,dbClear,dbInitialize};