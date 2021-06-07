import"../App.css";
import{ useState} from "react";
import{ Tabs, Input,Tag} from "antd";
import ChatModal from "../Components/ChatModal"
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
const{ TabPane } = Tabs;
var first=true;
const ChatRoom = ({ me,displayStatus,server }) => {
    server.onmessage = (m) => {
      onEvent(JSON.parse(m.data));
    };
    const onEvent = (e) => {
      const { type } = e;
      switch (type) {
        case 'CHAT': {
          //console.log("create "+e.data.to)
          setActiveKey(createChatBox(e.data.to,me,e.data.messages));                
          break;
        }
        case 'MESSAGE': {
         // console.log("get");
          var sender=e.data.message.name;
          var body=e.data.message.body;
          var key=e.data.key;
          var to=e.data.to;
          addMsg(key,sender,to,body);
          break;
        }
      }    
      //console.log(chatBoxes);    
      //renderMessages();
    };
    /*const savedCB=JSON.parse(localStorage.getItem(me));
    if(first===true){
      for(var c of savedCB){
        console.log(c);
        var x=c.split("_");
        var name=(x[0]===me)?x[1]:x[0];
        server.sendEvent({
          type: 'CHAT',
          data: { to: name, name: me },
        }); 
      }     
      first=false;
    }*/
    
    const[messageInput, setMessageInput] = useState("");
    const[modalVisible, setModalVisible] = useState(false);    
    const[activeKey, setActiveKey] = useState();
    const{chatBoxes,createChatBox,removeChatBox,addMsg} = useChatBox(displayStatus);
    const{sendMessage} = useChat(server,me);
    const addChatBox = () => { setModalVisible(true); };
   
   /* useEffect(() => {
      var cc=[];
      for(var c of chatBoxes){
        cc.push(c.key);
      }
      localStorage.setItem(me, JSON.stringify(cc));
    },[chatBoxes]);*/
    return(    
        <> <div className="App-title">         
            <h1>{me}'s Chat Room</h1> </div>      
            <div className="App-messages">        
                <Tabs 
                  type="editable-card"
                  activeKey={activeKey}          
                  onChange={(key) => { setActiveKey(key); }}
                  onEdit={(targetKey, action) => {
                    if (action === "add") addChatBox();
                    else if (action === "remove")  setActiveKey(removeChatBox(targetKey,activeKey));
                  }}
                >                    
                  {chatBoxes.map((
                      { friend, key, msgs }) => {  
                        return(              
                          <TabPane tab={friend}                
                            key={key} closable={true}>                
                            <p>{friend}'s chatbox.</p>
                             {msgs.map((a,i)=>{
                               if(a.sender===me)
                                return(
                                   <p className="App-message" key={i} style={{float: 'right',clear: 'both'}}> 
                                     {a.body+'\u00A0'}                  
                                    <Tag color="blue">{a.sender}</Tag>    
                                   </p>
                                );
                                else
                                return(
                                  <p className="App-message" key={i} style={{float: 'left',clear: 'both'}}>
                                   <Tag color="blue">{a.sender}</Tag>
                                   {'\u00A0'+a.body}
                                 </p>);
                                }) }           
                          </TabPane>          
                        );})                                              
                  }
                </Tabs>
                <ChatModal          
                  visible={modalVisible}          
                  onCreate={({ name }) => { 
                    server.sendEvent({
                      type: 'CHAT',
                      data: { to: name, name: me },
                    });       
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
                placeholder="Enter message here..."        
                onSearch={(msg) => {
                    if (!msg) {            
                        displayStatus({             
                            type: "error",              
                            msg: "Please enter message.",
                        });
                    return;
                    }
                    else if (activeKey === "") {            
                        displayStatus({              
                            type: "error",              
                            msg: "Please add a chatbox first.",
                        });            
                        setMessageInput("");
                        return;
                    }          
                    sendMessage({ key: activeKey, body: msg});          
                    setMessageInput("");
                }}   
            ></Input.Search>  
        </>
    );
};
export default ChatRoom;