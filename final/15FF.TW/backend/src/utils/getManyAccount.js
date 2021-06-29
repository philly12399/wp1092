import {readjson,writejson} from './readwrite'
const fs = require('fs');
var champs=readjson('./files/Champions.json').champion;
var getIDs=(name)=>{
    try{
    var l=['soloq','flex','mastery','tft'];
    var prefix='<a href="/summoner/';
    var ids=[];
    var c=0;
    for(var fname of l){
        var h = fs.readFileSync('./files/ids/'+fname,{encoding:'utf8', flag:'r'});
       
        var at=h.search(prefix);
        while(at !== -1){
            h=h.slice(at+prefix.length+10);
            var id = h.split('"')[0];
            if(!ids.includes(id)) 
                ids.push(id);
            else c++;
            at = h.search(prefix);
        }
    }
    var data=JSON.stringify(ids);
    fs.writeFile('./files/ids/ids.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
    
    }catch(e){console.log(e)}
};
export {getIDs};