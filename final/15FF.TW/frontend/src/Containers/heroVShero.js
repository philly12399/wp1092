import { useState } from "react";
import {Tag} from 'antd'
import {RollbackOutlined, SearchOutlined} from '@ant-design/icons';
import Search from '../Components/Search'
import HeroVSHeroTable from '../Components/HeroVSHero'
import TeemoGIF from '../image/teemo.gif'
import { handleHeroVSHero } from "../hook/useAPI";
import displayStatus from "../hook/useDisplayMsg";
import Password from "antd/lib/input/Password";

const HeroVSHero = ({setMode}) => {
    const [hero1, setHero1] = useState('')
    const [hero2, setHero2] = useState('')
    const [data, setData] = useState({})
    
    const getStatistic = () => {
        if(hero1.length && hero2.length)
            if(hero1 === hero2){
                displayStatus({'type':'error', 'msg': '請選擇兩位不一樣的英雄'})
            }             
            else
                handleHeroVSHero(hero1, hero2, setData)
        else{
            displayStatus({'type':'error', 'msg': '請先選擇想查詢的兩位英雄'})
        }
    }

    console.log(data)
    return (
        <div className='HeroVSHero-Main'>
            <div className='HeroVSHero-title'>
                <Tag color='darkred' style={{fontFamily:'Impact, fantacy', 
                    height:'32px', fontSize:'30px'}}>查看台服英雄對位數據</Tag> 
            </div>
            <div className='HeroVSHero-Header'>
                <RollbackOutlined 
                    style={{fontSize: '170%', marginRight: '100px', color: "white"}} 
                    onClick={()=>{setMode('SelectPanel')}}/>
                <div className='HeroSearch'>
                    <Search setHero={setHero1}/>
                </div>
                <div className='HeroSearch'>
                    <Search setHero={setHero2}/>
                </div>
                <SearchOutlined 
                    style={{fontSize: '170%' , marginLeft: '140px' ,color:"white"}}
                    onClick={()=>{getStatistic()}}/>
            </div>
            <div className='HeroVSHero-Pad'>
                {(data !== undefined && Object.keys(data).length == 0)?
                    <img src={TeemoGIF} alt="loading..."/>:
                    <div className='HeroVSHero-Table'>
                        <HeroVSHeroTable versusData={data}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default HeroVSHero

