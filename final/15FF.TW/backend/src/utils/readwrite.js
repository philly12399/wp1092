const fs = require('fs');
var readjson=(path)=>{
    var data=fs.readFileSync(path,'utf8');
    return JSON.parse(data);
}
var writejson=async (matches)=>{
    var data=JSON.stringify(matches);
    fs.writeFile('./files/user.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

}
const formatTime=(a)=>{
    let timeStr="";
    var l=[];
    l.push(String(a.getYear()+1900).padStart(4,'0'));
    l.push(String(a.getMonth()+1).padStart(2,'0'));
    l.push(String(a.getDate()).padStart(2,'0'));
    l.push(String(a.getHours()).padStart(2,'0'));
    l.push(String(a.getMinutes()).padStart(2,'0'));
    l.push(String(a.getSeconds()).padStart(2,'0'));
    for(let s of l){
      timeStr+=("-"+s);
    }
    return timeStr.slice(1);;
}
const createLog=(name)=>{
    var a=new Date();
    var f_name=formatTime(a)+"_"+name;
    var f_pth=log_dir+f_name+".log";
    return f_pth;
}
const writeLog=(str,f_pth)=>{
    fs.appendFile(f_pth,(formatTime(new Date())+"  "+str+"\n"),function (err){});
}
const log_dir='./files/log/';
export {readjson,writejson,createLog,writeLog};