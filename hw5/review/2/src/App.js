import axios from 'axios'
import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [serverIsOn, setServerIsOn] = useState(true);
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          const response = await startGame()
          if(response === "There is no response from the server")
          {
            setServerIsOn(false);
            setHasStarted(false);
            setHasWon(false);
            setStatus('');
            setNumber('');
          }
          else
          {
            setHasStarted(true);
            setStatus('');
          }
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
          const response = await restart()
          
          if(response === "There is no response from the server")
          {
            setServerIsOn(false);
            setHasStarted(false);
            setHasWon(false);
            setStatus('');
            setNumber('');
          }
          else
          {
            setHasWon(false);
            setNumber('');
            setStatus('');
          }
        }}
      >
        restart
      </button>
      <p>{status}</p>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    // console.log("handle guess");
    try {
      const response = await guess(number);
      // console.log("response :", response);
      if(response === "There is no response from the server")
      {
        setServerIsOn(false);
        setHasStarted(false);
        setHasWon(false);
        setStatus('');
        setNumber('');
      }
      setStatus(response);
      if(response === "Equal")
        setHasWon(true);
    } catch (error) {
      // console.log("error :", error);
    }
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
        console.log("Press enter");
        handleGuess();
    }
  };

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        onKeyPress={onKeyPress}
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

  const serverIsOnMode = (
    <>
      {hasStarted ? game : startMenu}
    </>
  )

  const waitForServerMode = (
    <div>
        <h1>Oops! The server is dead!</h1>
        <p>please wait a minute and press the restart button below.</p>
        <button
        onClick={async () => {
          const response = await startGame()
          if(response !== "There is no response from the server")
          {
            setServerIsOn(true);
            setHasStarted(true);
            setStatus('');
          }
        }}
      >
        restart
      </button>
    </div>
  )

  return <div className="App">{serverIsOn ? serverIsOnMode : waitForServerMode}</div>
}

export default App
