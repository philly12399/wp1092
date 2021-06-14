import { useState } from "react";
const client = new WebSocket('ws://localhost:8080');
const useChat = () => {
    const [status, setStatus] = useState({}) // { type, msg }
    
    client.sendEvent = (e) => client.send(JSON.stringify(e));
    
    const sendMessage = (payload) => {
        client.sendEvent({
            type: 'MESSAGE',
            data: payload,
        });
    } 
    return { status, sendMessage }
};
export default useChat