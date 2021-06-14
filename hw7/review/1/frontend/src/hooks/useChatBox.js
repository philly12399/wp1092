import { useState } from "react";
const client = new WebSocket('ws://localhost:8080');
const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([
        // {friend: "Mary", key: "MaryChatbox", chatLog: []},
    ])
    
    client.onmessage = (m) => {
      const {type, data} = JSON.parse(m.data)
      switch (type) {
        case 'INITCHAT': {
          var result = chatBoxes.filter(obj => {
            return obj.key === data.chatBoxName
          })
          if (result.length){
            // console.log(result)
            setChatBoxes(
              chatBoxes.map(item => 
                  item.key === data.chatBoxName
                  ? {...item, chatLog: [...(data.messages)]} 
                  : item 
            ))
          }
          break;
        }
        case 'MESSAGE': {
          var result = chatBoxes.filter(obj => {
            return obj.key === data.chatBoxName
          })
          if (result.length){
            var _chatLog = result[0].chatLog
            setChatBoxes(
              chatBoxes.map(item => 
                  item.key === data.chatBoxName
                  ? {...item, chatLog: [..._chatLog, data.message]} 
                  : item 
            ))
          }
          break;
        }
      }
    }
    
    
    const createChatBox = (friend, me) => {
        const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`
        if (chatBoxes.some(({ key }) => key === newKey))
            throw new Error(friend + "'s chat box has already opened.")
        const newChatBoxes = [...chatBoxes] // copy the previous
        newChatBoxes.push({ friend, key: newKey, chatLog:[] })  // add the new ChatBox
        setChatBoxes(newChatBoxes)
        client.send(
          JSON.stringify({
            type: 'CHAT',
            data: { to: friend, name: me },
          })
        )
        return newKey
    }
    
    const removeChatBox = (targetKey, activeKey) => {
        let newActiveKey = activeKey
        let lastIndex
        chatBoxes.forEach(({ key }, i) => {
          if (key === targetKey) { lastIndex = i - 1 } // 指到前面的那一個
        })
        // delete the targetkey's chatbox
        const newChatBoxes = chatBoxes.filter(
          (chatBox) => chatBox.key !== targetKey
        )
        if (newChatBoxes.length) {
          if (newActiveKey === targetKey) {
            if (lastIndex >= 0) {
              newActiveKey = newChatBoxes[lastIndex].key
            } else { newActiveKey = newChatBoxes[0].key }
          }
        } else newActiveKey = "" // No chatBox left
        setChatBoxes(newChatBoxes)
        return newActiveKey
    }
    return { chatBoxes, createChatBox, removeChatBox }
}
export default useChatBox;