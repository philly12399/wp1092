import './App.css'
import {useState, useEffect} from 'react';
import SignIn from './Containers/SignIn'
import HomePage from './Containers/HomePage'
import background from "./image/background.png";

const LOCALSTORAGE_KEY = 'save-me'
const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [signedIn, setSignedIn] = useState(false);
  const [summoner, setMe] = useState(savedMe || "");

  useEffect(()=>{
    if(signedIn){
      localStorage.setItem(LOCALSTORAGE_KEY, summoner)
    }
  }, [signedIn]);

  if(signedIn){
    return(
      <div className="App" style={{backgroundImage: `url(${background})` ,backgroundSize: 'cover',backgroundPosition: 'center'}}>
        <HomePage 
            summoner={summoner} 
            setMe={setMe}
            setSignedIn={setSignedIn}
        />
      </div>
    );
  }
  else{
    return(
      <div className="App" style={{backgroundImage: `url(${background})`,backgroundSize: 'cover',backgroundPosition: 'center'}}>
        <SignIn 
            summoner={summoner}
            setMe={setMe}
            setSignedIn={setSignedIn}
        />
      </div>
    )
  }
};

export default App;
