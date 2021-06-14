import "../App.css";
import{ Tabs, Input,Tag} from "antd";
import { useEffect, useState } from "react";
import { useQuery, useMutation,useSubscription} from '@apollo/react-hooks';
import {MSG_SUBSCRIPTION,CB_QUERY} from '../graphql';
const ChatBox = ({ me, chatbox_name }) => {

    const { loading, error, data, subscribeToMore } = useQuery(
        CB_QUERY,
        { variables: { query: chatbox_name } }
    );
   /* useEffect(() => {if(!loading&&data!==undefined) {
        console.log(data.chatboxs.messages)
        const nmsg=[...data.chatboxs.messages];
        setMsg(nmsg);
    }},[loading])*/
    useEffect(() => {
        try {
            subscribeToMore({
                document: MSG_SUBSCRIPTION,
                variables: { chatname: chatbox_name },
                updateQuery: (prev, { subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    
                    const newMessage = subscriptionData.data.message;
                    console.log(prev.chatboxs);
                    return{
                        ...prev,
                        chatboxs:[...prev.chatboxs,newMessage],
                    }
                },
            });
        } catch (e) {
            console.log('Subscription error', e.message);
        }
    }, [subscribeToMore, chatbox_name]);

    if (loading)
        return 'Loading...';

    if (error)
        return 'Something went wrong';

        return (
            <div>
                {data.chatboxs.map((a, i) => 
                    {
                        if(a.sender.name===me)
                        return(
                            <p className="App-message" key={i} style={{float: 'right',clear: 'both'}}> 
                            {a.body+'\u00A0'}                  
                            <Tag color="blue">{a.sender.name}</Tag>    
                            </p>
                        );
                        else
                        return(
                        <p className="App-message" key={i} style={{float: 'left',clear: 'both'}}>
                            <Tag color="blue">{a.sender.name}</Tag>
                            {'\u00A0'+a.body}
                        </p>);
                        }
                )}
            </div>
        );
};

export default ChatBox;
