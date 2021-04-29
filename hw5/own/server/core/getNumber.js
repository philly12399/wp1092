import {writeLog,first,setFirst} from '../server'
let number

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if(forceRestart || number===undefined ) number = Math.floor(Math.random()*100)+1;
  if(first) {setFirst(false),writeLog("start number="+number);}
  return number
}

export default getNumber
