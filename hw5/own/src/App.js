import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          let f =await startGame();
          if(f!=="server not responding") setHasStarted(true)
        }}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          let f =await restart()
          if(f!=="server not responding"){
            setHasWon(false)
            setStatus('')
            setNumber('')
          }
        }}
      >
        restart
      </button>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess =  async() => {
    try {
      var st = await guess(number);
      if(st === "Equal") {setHasWon(true); return;}
      setStatus(st);   
    } catch(error){
      setStatus(error.message);
    } 
    document.getElementById("input1").value="";
    
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        id="input1"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
      <p>{status}</p>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
