import {Tag} from 'antd';
import { MailOutlined,RollbackOutlined } from '@ant-design/icons';

const WebUsage = ({setMode}) => {
    return (<>
        <div className='WebUsage-title'>
            <Tag color='darkred' style={{fontFamily:'Impact', fontSize:'50px', 
                    height:'40px'}}>Web Usage and Reference</Tag> 
        </div>
        <div className='WebUsage-Pad'>
            <p>1. 本網站在每次登錄時，會抓取該帳號的最新10場對戰紀錄並上傳至我們的資料庫中，並且這些資料將會被用於本網站的其中幾項服務當中
                。若有疑慮，歡迎參考下方的聯絡資訊，我們會將你的對戰數據從資料庫移除。
            </p>
            <p>2. 本網站的所有數據，來源為<a href="https://lol.garena.tw/" target="_blank" style={{color: 'darkred'}}> Garena英雄聯盟</a>。且本網站只是我們期末學習成果驗收的一個產物，並不會有任何營利上的用途。</p>
            <p>3. 聯絡資訊： <MailOutlined/> b07902054@ntu.edu.tw  <MailOutlined/> b07902042@ntu.edu.tw</p>
        </div>
        <div className='WebUsage-Bottom'>
            <RollbackOutlined 
                    style={{fontSize: '170%', marginLeft: '12px', color: "white"}} 
                    onClick={()=>{setMode('SelectPanel')}}/>
        </div>
    </>)
}

export default WebUsage