import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
const notRespond=(e)=>{
  if(e.message==="Network Error") {
    alert("server not responding");
    return true;
  }
  return false;
}
const startGame = async () => {
  try{
    const {
      data: { msg }
    } = await instance.post('/start')
    return msg
  }catch(e){
    if(notRespond(e)) return "server not responding";
    else throw new Error (e);
  }
  
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try{
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })
    return msg;
  }catch(e){
    if(notRespond(e)) return "server not responding";
    else throw new Error ( number +' is not a valid number (1 - 100)' );
  }
}

const restart = async () => {
  try{
    const {
      data: { msg }
    } = await instance.post('/restart')
    return msg
  }catch(e){
    if(notRespond(e)) return "server not responding";
    else throw new Error (e);
  }
}

export { startGame, guess, restart }
