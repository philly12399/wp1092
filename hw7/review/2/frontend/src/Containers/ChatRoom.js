import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input, Tag } from "antd";
import ChatModal from "../Components/ChatModal.js";
import useChatBox from "../Hook/useChatBox.js";
import useChat from "../Hook/useChat.js";
import ChatMessage from "./ChatMessage.js";

const { TabPane } = Tabs; 
const ChatRoom =({ me, displayStatus })=> {
    const { createChatBox, removeChatBox, chatBoxes } = useChatBox();
    const { sendMessage, sendChat, historymessage, messageReturn, index } = useChat();
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const addChatBox = () =>{setModalVisible(true)};
    console.log(activeKey)

    useEffect(()=>{
      let mem1 = activeKey.split("_")[0];
      let mem2 = activeKey.split("_")[1];
      let receiver = "";
      if (mem1 !== me){
        receiver = mem1
      }else{
        receiver = mem2
      }
      sendChat({sender: me, to: receiver})
      console.log("send")
    },[activeKey])
    return (
        <> 
        <div className="App-title">
          <h1>{me}'s Chat Room</h1>
        </div> 
        <div className="App-messages"> 
         <Tabs type="editable-card" 
               activeKey={activeKey}
               onChange={(key)=>{setActiveKey(key);}}
               onEdit = {(targetKey, action)=>{
                if(action === "add") addChatBox();
                else if (action === "remove") setActiveKey(removeChatBox(targetKey,activeKey));
               }}>
            {chatBoxes.map((
            {friend, key, chatLog }) => {
                   return (
                    <TabPane
                      tab={friend}
                      key= {key} 
                      closable={true}>
                      <>
                        <p>{friend}'s chat box.</p>
                        <ChatMessage messageReturn={messageReturn} me={me} friend={friend} key={activeKey} />
                      </>
                      </TabPane>
                        );
                    })}
         </Tabs>
         
         

        
         <ChatModal
            visible={modalVisible}
            onCreate={async ({ name }) => {
              await setActiveKey(createChatBox(name,me));
              setModalVisible(false);
            }}
            onCancel={() => {
              setModalVisible(false);
          }}
          />

        </div>
        <Input.Search
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          enterButton="Send"
          placeholder= "Enter message here..."
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
         sendMessage({ sender: me, key: activeKey, body: msg });
         setMessageInput("");
        }}
        ></Input.Search>
        </>);


};

export default ChatRoom;
   
