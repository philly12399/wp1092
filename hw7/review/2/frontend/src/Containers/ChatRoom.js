import "../App.css";
import ChatModal  from '../Components/ChatModal';
import useChatBox from '../hooks/useChatBox';
import useChat from '../hooks/useChat'
import { useState } from "react";
import { Tabs, Input,Tag,Space } from "antd";


const { TabPane } = Tabs;
const ChatRoom = ({ me,displayStatus,server}) => {
  

  const sendEvent = async(e) => await server.send(JSON.stringify(e));
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const {chatBoxes,createChatBox,removeChatBox,updateChatbox}=useChatBox();
  const {sendMessage}=useChat(sendEvent);
  const [activeKey, setActiveKey] = useState("")
  const addChatBox = () => { setModalVisible(true); };
  const [msgs, setMsgs] = useState([])
  const [msgsuser, setMsgsuser] = useState([])
  // server = new WebSocket('ws://localhost:4000');
  server.onmessage = (m) => {
    onEvent(JSON.parse(m.data));
  };
  // server.onclose = () => {
  //   console.log('close connection')
  // }


  const onEvent = (e) => {
    
    const { type } = e;
    console.log(e);
    
    let messages = [];
    switch (type) {
      
      case 'CHAT': {
        messages = e.data.messages;
        // console.log(messages);
        setMsgs(messages);
        break;
      }
      case 'MESSAGE': {
        messages=msgs
        messages.push(e.data.message);
        setMsgs(messages);
        // console.log(msgs);
        
        break;
      }
      
    }
    // setMsgs(messages);
    // console.log(msgs)
  };

  const getkey=(key)=>{
    
  }

  return (
    <> <div className="App-title">
         <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs type="editable-card"
        onEdit={(targetKey, action) => {
          if (action === "add") addChatBox();
          else if (action === "remove") {
            let nkey=removeChatBox(targetKey,activeKey)
            setActiveKey(nkey);sendEvent({
            type: 'CHAT',
            data: { to: nkey.split("_")[0]===me?nkey.split("_")[1]:nkey.split("_")[0], name: me},
        });}
        }}
        activeKey={activeKey}
        onChange={(key) => { setActiveKey(updateChatbox(key));  sendEvent({
                  type: 'CHAT',
                  data: { to: key.split("_")[0]===me?key.split("_")[1]:key.split("_")[0], name: me},
              });}}>
          {chatBoxes.map((
            { friend, key,  }) => {
                return (
                    <TabPane tab={friend} 
                      key={key} closable={true}>
                      <p>{friend}'s chatbox.</p>
                      {msgs.map((item)=>{return (item.name===me)?(<p style={{textAlign: 'right'}}><Space><Tag color='gray'>{item.body}</Tag>{item.name}</Space></p>):(<p><Space>{item.name}<Tag color='gray'>{item.body}</Tag></Space></p>) })}
                    </TabPane>
                    
                );})}
             </Tabs>
             <ChatModal
              visible={modalVisible}
              onCreate={({ name }) => {
                setActiveKey(createChatBox(name,me));
                sendEvent({
                  type: 'CHAT',
                  data: { to: name, name: me},
              });
              console.log(name)
                setModalVisible(false);
              }}
              onCancel={() => {
                setModalVisible(false);
              }}
            />
            </div>
            <Input.Search
              value={messageInput}
              onChange={(e) => 
                setMessageInput(e.target.value)}
              enterButton="Send"
              placeholder=
                "Enter message here..."
                onSearch={(msg) => {
                  if (!msg) {
                    displayStatus({
                      type: "error",
                      msg: "Please enter message.",
                    });
                    return;
                  } else if (activeKey === "") {
                    displayStatus({
                      type: "error",
                      msg: "Please add a chatbox first.",
                    });
                    setMessageInput("");
                    return;
                  }
                  sendMessage({ key: activeKey, body: msg ,name:me});
                  
                  setMessageInput("");
                  
                }}
        
            ></Input.Search> 
        </>);
      };
      export default ChatRoom;