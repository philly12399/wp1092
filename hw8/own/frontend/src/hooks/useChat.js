import{ useState } from "react"; 
const useChat = (addMSG,me) => {
    const sendMessage = async (payload) => {  
        console.log("send")  ;
        var users=payload.key.split("_");
        var to= (me===users[0])? users[1]:users[0];
        var body=payload.body
        let m=await addMSG({variables:{sender:me,to:to,body:body}});
        console.log(m)
    }; // { key, msg }

    return{sendMessage};
};
export default useChat;
