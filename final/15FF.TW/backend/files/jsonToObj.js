const fs = require('fs');
//curl  https://ddragon.leagueoflegends.com/cdn/11.13.1/data/en_US/champion.json -o champion.json
var readjson=(path)=>{
    var data=fs.readFileSync(path,'utf8');
    return JSON.parse(data);
}
var data = readjson('./champion.json');
data =data.data;
keys=Object.keys(data);
var mapp ={};
for(var k of keys)
    mapp[data[k].key]=data[k].id;
var buf=JSON.stringify(mapp);
fs.writeFile('./key2Champion.json', buf, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
