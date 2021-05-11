import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  try{
    const {
      data: { msg }
    } = await instance.post('/start')
    
    return msg
  }
  catch (error){
    const msg = 'Error: Server not responding...'
    return msg
  }
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try{
    const {
      data: { hint: msg }
    } = await instance.get('/guess', { params: { number } })
    
    return msg
  }
  catch (error){
    if (error.message === 'Request failed with status code 400') {
      const msg = `Error: "${number}" is not a valid number (1 - 100)`
      return msg
    }
    else{
      const msg = 'Error: Server not responding...'
      return msg
    }
  }
}

const restart = async () => {
  try{
    const {
      data: { msg }
    } = await instance.post('/restart')
  
    return msg
  }
  catch (error){
    const msg = 'Error: Server not responding...'
    return msg
  }
}

export { startGame, guess, restart }
