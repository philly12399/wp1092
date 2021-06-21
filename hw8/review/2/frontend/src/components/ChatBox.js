import {Tag} from 'antd';
import {useRef, useEffect} from 'react';

const formatTextWrap = (text, maxLineLength) => {
    var words = text.replace(/[\r\n]+/g, ' ').split(' ')
    var lineLength = 0
    var output = ''
    for (var word of words) {
      if (lineLength + word.length >= maxLineLength) {
        output += `                \n${word} `
        lineLength = word.length + 1
      } else {
        output += `${word} `
        lineLength += word.length + 1
      }
    }
    return output
}

const ChatBox = ({chatLog, me, scroll, setScroll})=>{
    const messagesEndRef = useRef(null);
    const scrollToBottom = async () => {
        console.log("scroll");
        await messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
        setScroll(false)
    };

    useEffect(async () => {
        if(scroll ==true){
            await scrollToBottom();
            setScroll(false);
        }
    }, [scroll])
    return(
        chatLog.map((n, i)=>{
            let text = formatTextWrap(n.body, 70)
            return(
                (i!==chatLog.length-1)?
                (n.sender.name!=me)?
                <p className= "message-left">
                    <Tag color="geekblue">{n.sender.name}</Tag>
                    {text}
                </p>:
                <p className="message-right">
                    {text}&ensp;
                    <Tag color={(n.sender.name==me)? "orange":"blue"}>{n.sender.name}</Tag>
                </p>:
                (n.sender.name!=me)?
                <>
                <p className= "message-left">
                    <Tag color="geekblue">{n.sender.name}</Tag>
                    {text}
                </p><div ref={messagesEndRef}></div></>:
                <>
                <p className="message-right">
                    {text}&ensp;
                    <Tag color={(n.sender.name==me)? "orange":"blue"}>{n.sender.name}</Tag>
                </p>
                <div ref={messagesEndRef}></div>
                </>
            )
        })
    )
}
export default ChatBox;