import { useState } from "react";
import useChat from "../Hook/useChat.js";


 const useChatBox = () => {
  const [chatBoxes, setChatBoxes] = useState([]);
  const { sendChat} = useChat();
    const createChatBox =  (friend, me )=>{
        
        const newKey = me <= friend ?
              `${me}_${friend}` : `${friend}_${me}`;
       //只要部分符合條件就回傳true 
       if (chatBoxes.some(({ key }) => key === newKey)) {
         throw new Error(friend +
                         "'s chat box has already opened.");
       }
       sendChat({sender: me, to: friend})
       const newChatBoxes = [...chatBoxes];
       const chatLog =  [];

       newChatBoxes.push({ friend, key: newKey, chatLog });
       setChatBoxes(newChatBoxes);
       return newKey;
      };

    const removeChatBox =(targetKey, activeKey)=>{
      let newActiveKey = activeKey;
      let lastIndex;
         chatBoxes.forEach(({ key }, i) => {
           if (key === targetKey) { lastIndex = i - 1; }});
         const newChatBoxes = chatBoxes.filter(
           (chatBox) => chatBox.key !== targetKey);
         if (newChatBoxes.length) {
           if (newActiveKey === targetKey) {
             if (lastIndex >= 0) {
               newActiveKey = newChatBoxes[lastIndex].key;
             } else { newActiveKey = newChatBoxes[0].key; }
           }
         } else newActiveKey = ""; // No chatBox left
         setChatBoxes(newChatBoxes);
         return newActiveKey;
    }
    return { createChatBox, removeChatBox, chatBoxes };
 };
 export default useChatBox;
 
