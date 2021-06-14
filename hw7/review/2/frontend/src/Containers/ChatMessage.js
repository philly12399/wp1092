import { useState, useEffect } from 'react';

import {  Tabs ,Tag } from "antd";
const { TabPane } = Tabs;

const ChatMessage =  ({messageReturn, me, friend, key})=>(

	messageReturn.map(({name, body})=>{
		if (name === me){
			return(
                

            		<div style={{
            			display:'inline-block',
                        width: '100%',
                    }}>
                        <Tag color="cyan"
                            style={{
                                float:'right',
                                marginBottom: '1rem',
                            }}>{name}</Tag>
                        <Tag 
                            style={{
                            marginBottom: '1rem',
                            float: 'right',
                            }}>{body}</Tag>
                    </div>
                
         )
     	}
     	return(
                <div style={{
                        display:'inline-block',
                        width: '100%',
                    }}>
                        <Tag color="cyan"
                            style={{
                                float:'left',
                                marginBottom: '1rem',
                            }}>{name}</Tag>
                        <Tag 
                            style={{
                            marginBottom: '1rem',
                            float: 'left',
                            }}>{body}</Tag>
                    </div>

     	)


 	}
)

)

export default ChatMessage;