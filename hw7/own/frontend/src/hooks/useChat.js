import{ useState } from "react"; 
const useChat = (server,me) => {
    const sendMessage = (payload) => {    
        var users=payload.key.split("_");
        var to= (me===users[0])? users[1]:users[0];
        var body=payload.body
        server.sendEvent({
            type: 'MESSAGE',
            data: { to: to, name: me, body: body },
        });
    }; // { key, msg }

    return{sendMessage};
};
export default useChat;
