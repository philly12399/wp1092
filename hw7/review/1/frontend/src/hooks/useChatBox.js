import {useState} from 'react';

const client = new WebSocket('ws://localhost:8080')

const useChatBox=()=>{
    const [chatBoxes,setChatBoxes]=useState([]);
    //const [activeKey, setActiveKey] = useState("");

    const sendData = async (data)=>{
        await client.send(JSON.stringify(data))}

    const createChatBox = (friend,me) => {
        const newKey=me <=friend?`${me}_${friend}`:`${friend}_${me}`;
        if (chatBoxes.some(({key})=>key===newKey)){
            throw new Error(`${friend}'s chat box has already opened`)
        }
        const newChatBoxes=[...chatBoxes];
        const chatLog=[];
        newChatBoxes.push({friend,key:newKey,chatLog});
        setChatBoxes(newChatBoxes);
        //setActiveKey(newKey)
        sendData({type:'CHAT',data:{to:friend,name:me}})
        return newKey 
    }
    const removeChatBox = (targetKey,activeKey,me)=>{
        let newActiveKey=activeKey;
        let lastIndex;
        chatBoxes.forEach(({key},i)=>{
            if (key===targetKey){lastIndex=i-1;}})
        const newChatBoxes=chatBoxes.filter(
            (chatBox)=>chatBox.key!==targetKey)
        if (newChatBoxes.length){
            if (newActiveKey===targetKey){
                if (lastIndex>=0){
                    newActiveKey=newChatBoxes[lastIndex].key
                }else{newActiveKey=newChatBoxes[0].key}
            }
        }else newActiveKey='';
        setChatBoxes(newChatBoxes)
        sendData({type:"REMOVE",data:{chatBoxName:targetKey,me}})
        return newActiveKey
    }

    client.onmessage = (byteString)=>{
        const {data}=byteString
        const {type}=JSON.parse(data)

        switch(type){
          case 'CHAT':{
              const {chatBoxName,messages}=JSON.parse(data).data
              let newChatBoxes=[...chatBoxes];
              let targetIndex
              const newChatLog=[...messages];
              newChatBoxes.forEach(({key},i)=>{
                if (key===chatBoxName){targetIndex=i;}})
              newChatBoxes[targetIndex].chatLog=newChatLog
              setChatBoxes(newChatBoxes);
              break;
          }

          case 'MESSAGE':{
              const {message,chatBoxName}=JSON.parse(data).data
              let newChatBoxes=[...chatBoxes];
              let targetIndex
              newChatBoxes.forEach(({key},i)=>{
                if (key===chatBoxName){targetIndex=i;}})
              if (targetIndex===undefined){break;}
              const newChatLog=newChatBoxes[targetIndex].chatLog;
              newChatLog.push(message)
              newChatBoxes[targetIndex].chatLog=newChatLog
              setChatBoxes(newChatBoxes);
              break;
        }

        case 'SWITCH':{
            const {chatBoxName,messages}=JSON.parse(data).data
            let newChatBoxes=[...chatBoxes];
            let targetIndex
            const newChatLog=[...messages];
            newChatBoxes.forEach(({key},i)=>{
                if (key===chatBoxName){targetIndex=i;}})
            newChatBoxes[targetIndex].chatLog=newChatLog
            setChatBoxes(newChatBoxes);
            break;
        }

        case "INIT":{
            const {me,chatBoxes}=JSON.parse(data).data
            const newChatBoxes=[]
            chatBoxes.forEach((chatBox)=>{
                let name = chatBox.users[0].name===me? chatBox.users[1].name:chatBox.users[0].name
                newChatBoxes.push({friend:name,key:chatBox.name,chatLog:chatBox.messages});
            })
            setChatBoxes(newChatBoxes)
            break;
        }
        }
    }

    return {chatBoxes,createChatBox,removeChatBox,sendData,setChatBoxes}
}
export default useChatBox;