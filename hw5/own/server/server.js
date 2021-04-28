import express from 'express'
import cors from 'cors'
import path from 'path'

import guessRoute from './routes/guess'
import { exit } from 'process';
var fs= require("fs");

const isProduction = process.env.NODE_ENV === 'production'
const app = express()

// init middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (isProduction && req.headers['x-forwarded-proto'] !== 'https')
    return res.redirect('https://' + req.headers.host + req.url)
  return next()
})

// define routes
app.use('/api/guess', guessRoute)

const port = process.env.PORT || 4000

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, '..', 'build')

  app.use(express.static(publicPath))

  app.get('*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}
const log_dir='server/log/';
var f_name;
var f_pth;
const mkDir=()=>{
  if(!fs.existsSync(log_dir)){
    fs.mkdir( log_dir, '0777', function(err){
      if(err){
      console.log(err);
      }else{
      console.log("create log/");
      }
    })
  }
  else console.log("log/ already exist");
}
const formatTime=(a,sec=false)=>{
  let timeStr="";
  var l=[];
  l.push(String(a.getYear()+1900).padStart(4,'0'));
  l.push(String(a.getMonth()+1).padStart(2,'0'));
  l.push(String(a.getDate()).padStart(2,'0'));
  l.push(String(a.getHours()).padStart(2,'0'));
  l.push(String(a.getMinutes()).padStart(2,'0'));
  if(sec)  l.push(String(a.getSeconds()).padStart(2,'0'));
  for(let s of l){
    timeStr+=("-"+s);
  }
  return timeStr.slice(1);;
}
const createLog=()=>{
  var a=new Date();
  f_name=formatTime(a);
  var cnt=0;
  var files=fs.readdirSync(log_dir);
  for (let ff of files){
    if(ff.indexOf(f_name) !== -1){ cnt++;}
  }
  if(cnt!==0) f_name+="("+cnt+")"
  f_pth=log_dir+f_name+".log";
  fs.open(f_pth,'wx',(err,fd1)=>{ 
    if(err) console.log("can't open "+f_name+".log");
    else console.log("create "+f_name+".log");
  });
  writeLog("start server");
}
const writeLog=(str)=>{
  fs.appendFile(f_pth,(str+" "+formatTime(new Date(),true)+"\n"),function (err){});
}
//initialize
mkDir();
createLog();
var first=true;
const setFirst=(x)=>{first=x;};
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
export {writeLog,first,setFirst}