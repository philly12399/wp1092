import {findChamp} from './findChamp';
const fs = require('fs');
const parseRecentMatches=(h,summoner_name)=>{
    //console.log(h)
    var z = '<li><a href="/Summoner">查玩家</a></li>'
    h = h.slice(h.search(z)+z.length);
    z='<li class="active">'
    h = h.slice(h.search(z)+z.length);
    var end = h.search('</a></li>');
    var sum_name = h.slice(0,end);
    if(sum_name !== summoner_name) return null;    
    var s='"#tabs-recentgames" data-url="'
    var x=h.search(s);
    h=h.slice(x+s.length);
    //console.log(z) /Ajax/recentgames/112424055
    return h.split('"')[0];
}
const parseMatchIds=(h)=>{
    var match_ids=[];
    var s='class="text-white" href="/match/show/'
    for(var i=0;i<10;i++){
        var x=h.search(s);
        if(x === -1) break;
        h=h.slice(x+s.length);
        match_ids.push( h.split('/')[0]);
    }
    match_ids.reverse();
    return match_ids;
}
const parseMatch=(h,match_id)=>{
    var match={};
    match.id=match_id;
    match.stats=getStat(h);
    var g=getGametime(h);
    match.time=g[0];
    match.gamemap=g[1];
    match.gamemode=g[2];    
    match.gametime=g[3];
    var x= getSummoners(h);
    match.champions=x.champions;
    match.summoners=x.summoners;
    match.order=x.order;
    return match;
}
const getGametime=(h)=>{
    var s1='<h3 class="panel-title">';
    var x=h.search(s1);
    h=h.slice(x+s1.length);
    //time
    var s2='<div class="pull-right">';
    var x2=h.search(s2);
    var time=h.slice(x2+s2.length).split('<')[0];
    //
    var s3='<span>';
    h=h.substring(0,x2);
    var y=h.split("</span>");
    var g=[time];
    for(var i=1;i<4;i++){
       g.push(y[i].split(">")[1]);
    }
    return g;
}
const getStat=(h)=>{
    var s='var stats = ';
    var x=h.search(s);
    h=h.slice(x+s.length);   
    var stat=JSON.parse(h.split(';')[0]);
    var key=JSON.parse(fs.readFileSync('./files/stat_key.json','utf8'));
    var newstat=[];
    for (var i=0;i<10;i++){
        var obj={};
        for(var x of key)
            obj[x]=stat[i][x];
         newstat.push(obj);
    }     
    return newstat;
}
const getSummoners=(h)=>{
    var summoners=[];
    var champions=[];
    var win='<tr class="game-win">';
    var lose='<tr class="game-lose">';
    var ii=[h.search(win),h.search(lose)];
    var order=["win","lose"];
    if(ii[0]>ii[1]){
        order=["lose","win"];
        t=ii[0];
        ii[0]=ii[1];
        ii[1]=t;
    }
    for(var t=0;t<2;t++){
        var y=h.slice(ii[t]);
        var champ='<div class="inline-block champion champion48 championtip ddragonchampion" data-code="';
        var summ='<a href="/summoner/show/'
        var y1=y;
        var y2=y;
        for(var p=0;p<5;p++){
            var x=y1.search(champ);
            y1=y1.slice(x+champ.length);
            var xxx=findChamp(y1.split('"')[0]);
            champions.push(xxx);
            var x=y2.search(summ);
            y2=y2.slice(x+summ.length);
            summoners.push(y2.split('"')[0]);
        }
    }
    return {champions,summoners,order}
}
export {parseRecentMatches,parseMatchIds,parseMatch};