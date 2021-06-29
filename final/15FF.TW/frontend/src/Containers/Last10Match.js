import { useEffect, useState } from "react";
import {RollbackOutlined} from '@ant-design/icons';
import {Tag} from 'antd'
import TeemoGIF from '../image/teemo.gif'
import Last10MatchTable from '../Components/Last10MatchTable'
import Last10MatchAvgTable from '../Components/Last10MatchAvgTable'
import { handleLast10Match } from "../hook/useAPI";

const Last10Match = ({summoner, setMode}) => {
    const [data, setData] = useState([])
    const [display, setDisplay] = useState('Last10')
    
    useEffect(()=>{
        handleLast10Match(summoner, setData)
    },[])

    const handleDisplay = () => {
        if(display === 'Last10')
            setDisplay('Average')
        else 
            setDisplay('Last10')
    }

    return (
        <div className='Last10Match-Main'>
            <div className='Last10Match-title'>
            <Tag color='darkred' style={{fontFamily:'FangSong',
                    height:'32px', fontSize:'30px'}}>{(display === 'Last10')?'近期對戰逐場數據':'近期對戰平均數據'}</Tag>
            </div>
            <div className='Last10Match-Header' style={(display==='Last10')?{width: '80%'}:{width: '50%'}}>
                <RollbackOutlined 
                    style={{fontSize: '170%', marginRight: '100px', color: "white"}} 
                    onClick={()=>{setMode('SelectPanel')}}/>
                <Tag onClick={()=>{handleDisplay()}}>
                    {(display === 'Last10')?'查看平均數據':'查看詳細數據'}</Tag>
            </div>
            {(display === 'Last10')?(
                <div className='Last10Match-Pad'>
                    {(data.length == 0)?
                        <img src={TeemoGIF} alt="loading..."/>:
                        <div style={{width: '90%',height:'600px',marginTop:'50px'}}>
                            <Last10MatchTable matchData={data}/>
                        </div>
                    }
                </div>) : (
                <div className='Last10Match-Avg-Pad'>
                    <div className='Last10Match-Avg-Table'>
                        <Last10MatchAvgTable matchData={data}/>
                    </div>
                </div>
                ) 
            }   
        </div>
    )
}

export default Last10Match

