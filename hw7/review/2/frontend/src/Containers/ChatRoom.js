import "../App.css";
import ChatModal from "../Components/ChatModal";
import {useState} from "react";
import {Tabs,Input} from "antd";

const {TabPane}=Tabs;
const ChatRoom=({me})=>{
	const [chatBoxes,setChatBoxes]=useState([
		{friend: "Mary",key: "MaryChatbox",
			chatLog: []},
		{friend: "Peter",key: "PeterChatbox",
			chatLog: []}
	]);
	const [messageInput,setMessageInput]=useState("");
	const [modalVisible,setModalVisible]=useState(false);
	const addChatBox=()=>{setModalVisible(true);};
	const createChatBox=(friend)=>{
		const newKey=me<=friend?`${me}_${friend}`:`${friend}_${me}`;
		if(chatBoxes.some(({key})=>key===newKey)){
			throw new Error(friend+"'s chat box has already opened.");
		}
		const newChatBoxes=[...chatBoxes];
		const chatLog=[];
		newChatBoxes.push({friend,key: newKey,chatLog});
		setChatBoxes(newChatBoxes);
		// setActiveKey(newKey);
	}
	return (
		<>
			<div className="App-title">
				<h1>{me}'s Chat Room</h1>
			</div>
			<div className="App-messages">
				<Tabs
					type="editable-card"
					onEdit={(targetKey,action)=>{
						if(action==="add") addChatBox();
					}}
				>
					{chatBoxes.map(({friend,key,chatLog})=>{
						return (
							<TabPane tab={friend} key={key} closable={true}>
								<p>{friend}'s chatbox.</p>
							</TabPane>
						);
					})}
				</Tabs>
				<ChatModal
					visible={modalVisible}
					onCreate={({name})=>{
						createChatBox(name);
						setModalVisible(false);
					}}
					onCancel={()=>{
						setModalVisible(false);
					}}
				/>
			</div>
			<Input.Search
				value={messageInput}
				onChange={(e)=>setMessageInput(e.target.value)}
				enterButton="Send"
				placeholder="Enter message here..."
				onSearch={(msg)=>{
					setMessageInput("");
				}}
			></Input.Search>
		</>
	);
};

export default ChatRoom;