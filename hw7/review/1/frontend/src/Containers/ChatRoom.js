import '../App.css';
import {useEffect, useState} from 'react';
import {Tabs,Input,Tag} from 'antd';
import ChatModal from './ChatModal';
import useChatBox from '../Hooks/useChatBox';
import useChat from '../Hooks/useChat';

const {TabPane}=Tabs;
const ChatRoom=({me,displayStatus})=>{
    const [messageInput, setMessageInput]=useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const {chatBoxes,createChatBox,removeChatBox,sendData,setChatBoxes} =useChatBox()
    //const {status,sendMessage}=useChat()

    const addChatBox = () => { setModalVisible(true); };

    useEffect(()=>{
        sendData({type:'INIT',data:{me}})
    },[])

    return(
        <>
        <div className='App-title'>
            <h1>{me}'s Chat Room</h1>
        </div>
        <div className='App-messages'>
            <Tabs type='editable-card'
            activeKey={activeKey}
            onChange={(key)=>{setActiveKey(key);sendData({type:'SWITCH',data:{chatBoxName:key}})}}
            onEdit={(targetKey,action)=>{
                if (action==='add') addChatBox()
                else if (action==='remove') setActiveKey(removeChatBox(targetKey,activeKey,me))
            }}>
                {chatBoxes.map(({friend,key,chatLog})=>{
                    return (
                    <TabPane tab={friend} key={key} closable={true}>
                    </TabPane>)})}
            </Tabs>
            <ChatModal visible={modalVisible}
                    onCreate={({name})=>{
                        setActiveKey(createChatBox(name,me));
                        setModalVisible(false)
                    }}
                    onCancel={()=>{
                        setModalVisible(false)
                    }}/>
                    <div className="App-message" >
            { chatBoxes.length===0 ?
                            (<p style={{ color: '#ccc' }}>No messages...</p>):
                            (activeKey===''?(null):
                            (chatBoxes.find((chatBox)=>chatBox.key===activeKey).chatLog.map(({name,body},i)=>(
                                name!==me?(
                                    <div className="bubbleWrapper" key={i}>
                                        <div className="inlineContainer">
                                            <div className='other name'>{name}</div>
                                            <div className="otherBubble other">{body}</div>
                                        </div>
                                    </div>):
                                (<div className="bubbleWrapper" key={i}>
		                                <div className="inlineContainer own">
			                                <div className='own name'>{name}</div>
			                                <div className="ownBubble own">{body}</div>
		                                </div>
	                                </div>
                                )
                            ))))
                        }
                        </div>
            
        </div>
        <Input.Search 
        value={messageInput}
        onChange={(e)=>setMessageInput(e.target.value)}
        enterButton='Send'
        placeholder='Enter message here...'
        onSearch={(msg)=>{
            if (!msg){
                displayStatus({
                    type:"error",
                    msg:"Please enter message"
                });
                return;
            }
            else if (activeKey===''){
                if (chatBoxes.length===0){
                    displayStatus({
                        type:"error",
                        msg:"Please add a chatbox first"
                    });
                }
                else{
                    displayStatus({
                        type:"error",
                        msg:"Please select a chatbox first"
                    });
                }
                setMessageInput('')
                return;
            }
            sendData({type:'MESSAGE',data:{to:chatBoxes.filter(
                (chatBoxe)=>chatBoxe.key===activeKey)[0]['friend'],name:me,body:messageInput}})
            setMessageInput('')
        }}
        ></Input.Search>
        </>
    )
}
export default ChatRoom