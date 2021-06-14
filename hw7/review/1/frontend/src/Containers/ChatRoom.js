import "../App.css";
import ChatModal from "../Components/ChatModal"
import useChatBox from "../hooks/useChatBox"
import useChat from "../hooks/useChat"
import { useState } from "react";
import { Tabs, Input, Tag } from "antd";
const { TabPane } = Tabs


const ChatRoom = ({ me, displayStatus}) => {
    // const [chatBoxes, setChatBoxes] = useState([
    //     {friend: "Mary", key: "MaryChatbox", chatLog: []},
    //     {friend: "Peter", key: "PeterChatBox", chatLog: []}, 
    // ])
    const [messageInput, setMessageInput] = useState("")
    const {chatBoxes, createChatBox, removeChatBox} = useChatBox()
    const {sendMessage} = useChat()
    
    const [modalVisible, setModalVisible] = useState(false)
    const [activeKey, setActiveKey] = useState("")

    const addChatBox = () => { setModalVisible(true) }
    
    return (
        <> 
        <div className="App-title">
            <h1>{me}'s Chat Room</h1>
        </div>
        <div className="App-messages">
            <Tabs 
                type="editable-card"
                onEdit={(targetKey, action) => {
                    if (action === "add") addChatBox()
                    else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey))
                }}
                activeKey={activeKey}
                onChange={(key) => { setActiveKey(key) }}
            >
                {
                    chatBoxes.map(({ friend, key, chatLog }) => {
                        return (
                            <TabPane
                                tab={friend}
                                key={key} 
                                closable={true}>
                                {
                                    chatLog.length === 0 ? 
                                    <p style={{ color: '#ccc' }}> No messages... </p> :
                                    chatLog.map( ({ name, body }, i) => (
                                        <p className="App-message" key={i}>
                                        <Tag color="blue">{name}</Tag> {body}
                                        </p>
                                    ))
                                }
                            </TabPane>
                        )
                    })
                }
            </Tabs>
            <ChatModal
                visible={modalVisible}
                onCreate={({ name }) => {
                    setActiveKey(createChatBox(name, me))
                    setModalVisible(false)
                }}
                onCancel={() => {
                    setModalVisible(false)
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
                    })
                    return
                } else if (activeKey === "") {
                    displayStatus({
                        type: "error",
                        msg: "Please add a chatbox first.",
                    })
                    setMessageInput("")
                    return
                }
                var to = activeKey.split('_').filter(i => i !== me)
                sendMessage({ name: me, to: to.length?to[0]:me, body: msg })
                setMessageInput("")
            }}
        ></Input.Search>
        </>
    )
}
export default ChatRoom
