import {readjson,writejson} from './readwrite'
var champs=readjson('./files/Champions.json').champion;
var findChamp=(name)=>{
    for(var i=0;i<champs.length;i++){
        var s=champs[i].toLowerCase();
        if(name.toLowerCase()===s) return champs[i];
    }
    s="Error: "+name+" not found";
    throw s;
};
export {findChamp,champs};