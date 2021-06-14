import { useState, useEffect } from 'react';
const client = new WebSocket('ws://localhost:8080');
// let messageReturn = [{name:'Winnie',body:'Hello, World'}];

  const useChat = () => {
    const [status, setStatus] = useState({}); // { type, msg }
    const [messageReturn, setMessageReturn] = useState([]);
    const [historymessage, setHistorymessage] = useState([]);
    const [index, setIndex] = useState([]);

    client.onmessage =  async (message) =>{
        const { data } = message;
        // console.log({data})
        const [task,payload] = JSON.parse(data)

        switch(task){
          case 'Status':{
            setStatus(payload)
            // console.log(status)
            break;
          }

          case 'Message':{
            // console.log(payload.message);
            // const arr_msg = index.histmessage
            // console.log(arr_msg)
            if (historymessage.length !==0){
              let newMessage = [...historymessage,payload.message]
              setMessageReturn(newMessage)
              console.log(newMessage)
            }else{
              setMessageReturn([...messageReturn,payload.message])
            }
            // setIndex([{chatBoxName:index.chatBoxName,histmessage:newMessage}])
            
            

            // setHistorymessage(...historymessage,payload.message)
            // messageReturn.push(payload.message)
            // console.log(historymessage)
            // console.log(messageReturn)
            break;
          }
          case 'Chat':{
            // console.log(payload)
            const msg = payload.data
            const { messages }  = msg
            const { ChatBox } = msg
            // console.log(ChatBox)
            const histmessage = messages
            // const chatBoxName = ChatBox
            setHistorymessage(histmessage)
            console.log(histmessage)
            // setIndex([{chatBoxName,histmessage}])
            // console.log(index)
            setMessageReturn(histmessage)

          }

        }
    }
   
   // useEffect(()=>{
   //  return messageReturn
   // },[messageReturn])


    const sendData  = async (data) =>{
      await client.send(JSON.stringify(data));
    }
    const sendChat =  (payload) =>{
     // console.log(payload)
      const data = payload
      console.log(data)
      sendData({type:'CHAT', data})

    }
    const sendMessage = (payload) => {
      let mem1 = payload.key.split("_")[0];
      let mem2 = payload.key.split("_")[1];
      let receiver = "";
      if (mem1 !== payload.sender){
        receiver = mem1
      }else{
        receiver = mem2
      }
      const data = {name:payload.sender, to:receiver, body: payload.body}
      // console.log(data)
      sendData({type:'MESSAGE', data})

      }; // { key, msg }
    return { status, sendMessage, messageReturn, historymessage, sendChat, index };
  };
  export default useChat;




