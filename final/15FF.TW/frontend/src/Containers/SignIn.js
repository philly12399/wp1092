import '../App.css';
import { useEffect, useState } from 'react';
import {Input, Tag} from 'antd';
import {UserOutlined, LoadingOutlined} from '@ant-design/icons';
import displayStatus from '../hook/useDisplayMsg'
import {handleSignIn} from '../hook/useAPI'

const SignIn = ({summoner, setMe, setSignedIn}) => {
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(loading){
            displayStatus({'type': 'success', 'msg': '正在讀取您的召喚師資訊，這可能需要一點時間，請稍候'})
            handleSignIn(summoner, setSignedIn, setLoading)
        }
    }, [loading])
    console.log(loading)
    return(<>
            <div className='App-title'>
                <Tag color='darkred' style={{fontFamily:'Impact, fantacy', 
                    height:'40px', fontSize:'50px'}}>15FF Taiwan</Tag>
            </div>
            <Input.Search
                prefix={<UserOutlined/>}
                value={summoner}
                enterButton='Search'
                onChange={(e) => setMe(e.target.value)}
                placeholder='請輸入召喚師名稱'
                size='large'
                style={{ width: 350, margin: 50 }}
                onSearch={(name) => {
                    if (!name)
                        displayStatus({
                            type: 'error',
                            msg: '召喚師名稱不可留空',
                        });
                    else{
                        setLoading(true)
                    }
                }}
            ></Input.Search>
            <LoadingOutlined style={(loading)?({color: 'white', fontSize:'35px'})
                                        :({color:'white',fontSize:'35px',display:'none'})}/>
    </>)
};

export default SignIn
