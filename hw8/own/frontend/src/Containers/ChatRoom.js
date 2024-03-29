import"../App.css";
import{ useState, useEffect, useCallback } from "react";
import { useQuery, useMutation,useSubscription} from '@apollo/react-hooks';
import{ Tabs, Input,Tag} from "antd";
import ChatModal from "../Components/ChatModal"
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
import { CREATE_CB_MUTATION,CREATE_MSG_MUTATION,CB_QUERY} from '../graphql';
import ChatBox from './ChatBox';
const{ TabPane } = Tabs;
var first=true;
const ChatRoom = ({ me,displayStatus}) => {
    const[messageInput, setMessageInput] = useState("");
    const[modalVisible, setModalVisible] = useState(false);    
    const[activeKey, setActiveKey] = useState();
    const [addMSG]=useMutation(CREATE_MSG_MUTATION);
    const [addChat]=useMutation(CREATE_CB_MUTATION);
    const{chatBoxes,setChatBoxes,createChatBox,removeChatBox,addMsg} = useChatBox(displayStatus);
    const{sendMessage} = useChat(addMSG,me);
    const used={};
    const makeName = (name, to) => {
      return [name, to].sort().join('_');
    };
    const  addChatBox =()=>{
      setModalVisible(true);
    }
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
                    else if (action === "remove")  {setActiveKey(removeChatBox(targetKey,activeKey));delete used[targetKey];}
                  }}
                >                    
                  {chatBoxes.map((
                      { friend, key}) => {  
                        return(              
                          <TabPane tab={friend} key={key} closable={true}>               
                            <ChatBox me={me} chatbox_name={key} setChatBoxes={setChatBoxes}/>
                          </TabPane>          
                        );})                                              
                  }
                </Tabs>
                <ChatModal          
                  visible={modalVisible}          
                   onCreate={async ({ name }) => {        
                    setModalVisible(false);
                    let c=await addChat({variables:{name1:me,name2:name}});
                    let k=makeName(me,name);  
                    setActiveKey(createChatBox(name,me));         
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