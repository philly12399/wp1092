import './App.css'
import { useState, useEffect } from 'react';
import { message } from "antd";
import SignIn from './Containers/SignIn.js';
import Chatroom from './Containers/ChatRoom.js';


// 有登入過的人，名字會被存起來，給下次登入用
const LocalStorage = "save-me";
// localStorage.removeItem(LocalStorage)

const App = () =>{
  const savedMe = localStorage.getItem(LocalStorage);
  const [signedIn, setsignedIn] = useState(false);
  const [status, setStatus] = useState("");
  const [me, setMe] = useState(savedMe||"");
  console.log(savedMe)

  const displayStatus =(payload)=>{
    if(payload.msg){
      const {type,msg} = payload
      const content ={
        content: msg, duration: 0.5
      }
      switch (type){
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }
  useEffect(()=>{
    displayStatus(status)
  }, [status]);

  useEffect(()=>{
    if (signedIn===true){
      localStorage.setItem(LocalStorage, me);
    }
  }, [signedIn]);


  return(
      <div className="App">
        {signedIn? (<Chatroom me={me} displayStatus={displayStatus}/>):
        (<SignIn me = {me} setMe={setMe} setsignedIn={setsignedIn} displayStatus={displayStatus}/>)}
      </div>
    );
};

export default App;