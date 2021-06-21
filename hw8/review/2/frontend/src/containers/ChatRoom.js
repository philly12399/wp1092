import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input, Badge } from "antd";
import ChatModal from "../components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import ChatBox from "../components/ChatBox";
import {useMutation, useQuery, useSubscription} from '@apollo/react-hooks';
import {CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, CHATBOX_SUBSCRIPTION, CHATBOX_QUERY} from '../graphql';
const { TabPane } = Tabs;

const ChatRoom = ({ me , displayStatus}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const addChatBox = ()=>{setModalVisible(true)};
    const {chatBoxes, createChatBox, removeChatBox, setChatBoxes} = useChatBox();
    const [status, setStatus] = useState({});
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const {data, error, loading, subscribeToMore } = useQuery(CHATBOX_QUERY);
    const [scroll, setScroll] = useState(false);
    const [subscribed, setSubscribed] = useState([]);
    const [news, setNews] = useState({updated: true, boxName: ""});
    useEffect(() => {
        setScroll(true);
        if(status.type == "CHAT"){
            // setchatBoxes()
            // console.log(status.data);
            setChatBoxes(chatBoxes.map((n)=>{
                if(n.key== activeKey){
                    let a = n
                    a.chatLog = status.data.messages;
                    // console.log(a);
                    return a;
                }else{
                    return n;
                }
            }))
        }else if(status.type == "MESSAGE"){
            setChatBoxes(chatBoxes.map((n)=>{
                if(n.key== activeKey){
                    let a = n
                    a.chatLog = [...a.chatLog, status.data.message];
                    return a;
                }else{
                    return n;
                }
            }))
        }else if(status.type == "RECEIVE"){
            setChatBoxes(chatBoxes.map((n)=>{
                if(n.key== status.data.key){
                    let a = n
                    a.chatLog = [...a.chatLog, status.data.message];
                    return a;
                }else{
                    return n;
                }
            }))
        }
    }, [status])



    useEffect(() => {
        // console.log("active: ", activeKey);
        // console.log("have message: ", news.boxName);
        if(news.updated==false){
            if(news.boxName !== activeKey){
                // console.log("not the same");
                setChatBoxes(chatBoxes.map((n)=>{
                    if(n.key== news.boxName){
                        let a = n
                        a.news= a.news+1;
                        // console.log("new +1: ", a.news);
                        return a;
                    }else{
                        return n;
                    }
                }))
            }
            setNews({updated:true, boxName:""});
        }
    }, [news])

    useEffect(() => {
        if(activeKey=="") return;
        // console.log("change key to ", activeKey);
        setChatBoxes(chatBoxes.map((n)=>{
            if(n.key== activeKey){
                let a = n
                a.news = 0;
                return a;
            }else{
                return n;
            }
        }))
    }, [activeKey])

    useEffect(() => {
        // console.log("new subscription");
        if(subscribed.length==0) return;
        try {
            subscribeToMore({
                  document: CHATBOX_SUBSCRIPTION,
                  variables: {chatboxName: subscribed[subscribed.length-1]},
                  updateQuery: (prev, { subscriptionData }) => {
                    // console.log("listen to ", subscriptionData.data.newMessage.chatboxName)
                    // console.log(subscriptionData.data.newMessage.data.sender.name, "send a message")
                    if(subscriptionData.data.newMessage.data.sender.name !== me){
                        // console.log("receive message: ", subscriptionData.data.newMessage.chatboxName);
                        setNews({updated: false, boxName: subscriptionData.data.newMessage.chatboxName});
                        setStatus({type:"RECEIVE", data:{message: subscriptionData.data.newMessage.data, key:subscriptionData.data.newMessage.chatboxName}})
                    }
                    return;
                }
                })
        } catch (e) {}
    }, [subscribed]);

    return (
        <>
            <div className="App-title"><h1>{me}'s Chat Room</h1> </div>
            <div className="App-messages">
                <Tabs type="editable-card"
                    activeKey={activeKey}
                    onChange={ async (key) => {
                        // getChat(key, me);
                        setScroll(true);
                        setActiveKey(key);
                        // const keys = key.split("_");
                        // let chatbox = await startChat({ variables: { 
                        //     name1: (keys[0]==me)? keys[1]:keys[0],
                        //     name2: me,
                        // },
                        // });
                    //     setStatus({type:"CHAT", data:{messages: chatbox.data.createChatBox.messages}
                    // });
                    }}
                    onEdit={async (targetKey, action) => {
                        if (action === "add")
                            addChatBox();
                        else if (action === "remove"){
                            const key = removeChatBox(targetKey, activeKey)
                            // deleteBox(targetKey,key, me);
                            setActiveKey(key);
                            // if(key!=""){
                            //     const keys = key.split("_");
                            //     let chatbox = await startChat({ variables: { 
                            //         name1: (keys[0]==me)? keys[1]:keys[0],
                            //         name2: me,
                            //     },
                            //     });
                            //     setStatus({type:"CHAT", data:{messages: chatbox.data.createChatBox.messages}});        
                            // }    
                        }
                    }}>
                    {chatBoxes.map(({ friend, key, chatLog, news}) => {
                        return (
                            <TabPane tab={
                                (news!==0)?
                                <Badge count={news} className="Badge">{friend}&ensp;&ensp;</Badge>:
                                friend
                            } key={key} closable={true} className="TabPane">
                                <ChatBox chatLog={chatLog} me={me} scroll={scroll} setScroll={setScroll}/>
                            </TabPane>
                        )
                    })}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={
                        async ({ name }) => {
                            const key = createChatBox(name, me);
                            setActiveKey(key);
                            setModalVisible(false); 
                            let chatbox = await startChat({ variables: { 
                                name1: name,
                                name2: me,
                            },
                            });
                            setStatus({type:"CHAT", data:{messages: chatbox.data.createChatBox.messages}});  
                            if(!(key in subscribed))
                                setSubscribed([...subscribed, key])
                        }
                    }
                    onCancel={() => { setModalVisible(false);}}
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={e =>setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder="Enter message here..."
                onSearch={ async (msg) => { 
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
                    // sendMessage({ key: activeKey, body: msg }, me);
                    const keys = activeKey.split("_");
                    let message = await sendMessage({variables:{
                        from: me,
                        to: (keys[0]==me)? keys[1]:keys[0],
                        body:msg,
                    }})
                    // console.log(message);
                    setStatus({type:"MESSAGE", data:{message: message.data.createMessage}})
                    setMessageInput("");
                }} >   
            </Input.Search>
        </>
    );
};

export default ChatRoom;
                         