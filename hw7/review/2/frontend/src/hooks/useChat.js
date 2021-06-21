import { useState } from "react";  

const useChat = (sendEvent) => {

  // const server = new WebSocket('ws://localhost:4000');
  // server.onclose = () => {
  //   console.log('close connection')
  // }
  
  // server.sendEvent = (e) => server.send(JSON.stringify(e));

  // const startChat = (payload) => {
  //   if (!payload.key.split("_")[0] || !payload.key.split("_")[1]) {
  //     throw new Error('Fill in the inputs');
  //   }

  //   server.sendEvent({
  //     type: 'CHAT',
  //     data: { name: payload.key.split("_")[0], to: payload.key.split("_")[1] },
  //   });
  // };

  const sendMessage = (payload) => {
    if (!payload.key.split("_")[0] || !payload.key.split("_")[1] || !payload.body) {
      throw new Error('Empty input!');
    }
    console.log(payload)
    sendEvent(payload.name===payload.key.split("_")[0]?({ type: 'MESSAGE',
    data: { to: payload.key.split("_")[1],name: payload.key.split("_")[0],  body: payload.body },}):({type: 'MESSAGE',
    data: { to: payload.key.split("_")[0],name: payload.key.split("_")[1],  body: payload.body },}))
    // server.sendEvent({
    //   type: 'MESSAGE',
    //   data: { to: payload.key.split("_")[0],name: payload.key.split("_")[1],  body: payload.body },
    // });
  };
  // const onEvent = (e) => {
  //   const { type } = e;
  //   console.log(type)
  //   switch (type) {
  //     case 'CHAT': {
  //       messages = e.data.messages;
  //       break;
  //     }
  //     case 'MESSAGE': {
  //       messages.push(e.data.message);
  //       break;
  //     }
  //   }
  //   // renderMessages();
  // };

  // const renderMessages = () => {
  //   resetMessages();

  //   messages.forEach(({ body, name }) => {
  //     const newEle = document.createElement('li');
  //     newEle.innerHTML = `${name}: ${body}`;
  //     messagesDOM.appendChild(newEle);
  //   });
  // };

  // const resetMessages = (payload) => {
  //   // remove all children
  //   messagesDOM.innerHTML = '';
  // };

  
  const [status, setStatus] = useState({}); // { type, msg }
  // const sendMessage = (payload) => {
  //   console.log(payload);
  // }; // { key, msg }
  
  return { status, sendMessage};
};
export default useChat;