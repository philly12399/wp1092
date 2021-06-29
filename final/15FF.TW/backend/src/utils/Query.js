import Champion from '../models/Champion';
import Match from '../models/Match';
import Summoner from '../models/Summoner'
import {champs} from './findChamp';
var query1=async (c1,c2)=>{
    var s=await Champion.find({"name":c1});
    s=s[0];
    var vs=new Map(s.versus);
    if(!vs.has(c2)) throw "Error: No match between";
    var stats=vs2obj(vs.get(c2));
    stats.name=[c1,c2];
    return stats;
};
var vs2obj=(vs)=>{
    var obj={};
    var n=vs.match_num[0];
    obj.match_num=vs.match_num;
    obj.win_rate=[((vs.win_num[0]/n)*100).toFixed(2),
                  ((vs.win_num[1]/n)*100).toFixed(2)];
    obj.kill=[(vs.kill[0]/n).toFixed(1),(vs.kill[1]/n).toFixed(1)];
    obj.death=[(vs.death[0]/n).toFixed(1),(vs.death[1]/n).toFixed(1)];
    obj.assist=[(vs.assist[0]/n).toFixed(1),(vs.assist[1]/n).toFixed(1)];
    obj.kda=[KDA(vs.kill[0],vs.death[0],vs.assist[0]),KDA(vs.kill[1],vs.death[1],vs.assist[1])];
    obj.gold=[(vs.gold[0]/n).toFixed(0),(vs.gold[1]/n).toFixed(0)];
    obj.minion=[(vs.minion[0]/n).toFixed(0),(vs.minion[1]/n).toFixed(0)];
    obj.damage=[(vs.damage[0]/n).toFixed(0),(vs.damage[1]/n).toFixed(0)]
    return obj;
}
var query2=async (c,name)=>{
    var s=await Champion.find({"name":c});
    s=s[0];
    if(s.property.match_num===0){
        throw "Error: No data of this champion."
    }
    var stats=champion2obj(c,s.property);
    var s2=await Summoner.find({"name":name});
    s2=s2[0];
    var used={};
    
    for(var i=0;i<champs.length;i++){
        var key=champs[i];
        var inn=false;
        if(s2.champstats.has(key)) inn=true;
        used[key]=inn;
    }
    return [stats,used];
};
var champion2obj=(name,p)=>{
    var obj={};
    obj.match_num=p.match_num;
    obj.win_rate=((p.win_num/p.match_num)*100).toFixed(2);
    obj.kill=(p.kill/p.match_num).toFixed(1);
    obj.death=(p.death/p.match_num).toFixed(1);
    obj.assist=(p.assist/p.match_num).toFixed(1);
    obj.kda=KDA(p.kill,p.death,p.assist);
    obj.damage=(p.damage/p.match_num).toFixed(0);;
    obj.gold=(p.gold/p.match_num).toFixed(0);
    obj.minion=(p.minion/p.match_num).toFixed(0);
    obj.name=name;
    return obj;
}
var query3=async (name)=>{
    var s=await Summoner.find({"name":name});
    s=await s[0].populate('matches').execPopulate();
    var stats=[];
    for(var i=s.matches.length-1;i>=0;i--){
        var m=s.matches[i];
        var ind=findname(m,name);
        var obj=match2obj(m,ind);
        stats.push(obj);
    }
    return stats;
};
var findname=(m,name)=>{
    var l= m.summoners.length;
    for(var i=0;i<l;i++){
        if(m.summoners[i]===name) return i;
    }
}
var match2obj=(m,ind)=>{
    var stats=m.stats[ind];
    //console.log(stats);
    var obj={};   
    obj.champion=m.champions[ind];
    var t = parseInt(ind/5);
    obj.win= (m.order[t]==="win")? true:false;
    obj.kill=stats.CHAMPIONS_KILLED;
    obj.death=stats.NUM_DEATHS;
    obj.assist=stats.ASSISTS;
    obj.damage=stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS;
    obj.level=stats.LEVEL;
    obj.gold=stats.GOLD_EARNED;
    obj.kda=KDA(obj.kill,obj.death,obj.assist);
    obj.minion=(stats.MINIONS_KILLED+stats.NEUTRAL_MINIONS_KILLED);
    obj.time=m.time;
    obj.gamemap=m.gamemap;
    obj.gametime=m.gametime;
    return obj;
}
var KDA=(k,d,a)=>{
    var kda;
    if(d===0) kda=(k+a);
    else kda=(k+a)/d;
    return kda.toFixed(2);
}
var query4=async (c,name)=>{
    var s=await Summoner.find({"name":name});
    s=s[0];
    var o=s.champstats.get(c);
    var obj=champion2obj(name,o);
    return obj;
};
export {query1,query2,query3,query4,findname} ;
