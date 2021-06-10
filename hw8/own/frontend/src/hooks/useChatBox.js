import{ useState } from "react";
const useChatBox = (displayStatus) => {
    const[chatBoxes, setChatBoxes] = useState([]);      
    const createChatBox = (friend,me,log) => {
        const newKey = me <= friend ?`${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
            displayStatus({
                type:"error",
                msg:friend +"'s chat box has already opened.",
            })
            return false;
        }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];    
        for(var m of log){            
            var sender=m.name;
            var to=(sender===me)? friend:me;
            var body=m.body;
            chatLog.push({sender:sender, to:to, body:body});
        }
        newChatBoxes.push({ friend, key: newKey,msgs:chatLog});
        setChatBoxes(newChatBoxes);    
        return newKey;
    };
    const addMsg=(key,sender,to,body)=>{
        //console.log("add"+body);
        const newChatBoxes = [...chatBoxes];
        for(var c of newChatBoxes){
            if(c.key===key){
               c.msgs.push({sender:sender, to:to, body:body});
                break;
            }
        }
        setChatBoxes(newChatBoxes);  
    }
    const removeChatBox = (targetKey,activeKey) => {
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
                    } else{ newActiveKey = newChatBoxes[0].key; }
                }
            }  else newActiveKey = ""; // No chatBox left    
            setChatBoxes(newChatBoxes);    
            return newActiveKey;
    };
    return{chatBoxes,createChatBox, removeChatBox,addMsg };
};
export default useChatBox;