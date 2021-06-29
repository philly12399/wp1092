import { useState } from "react";
import {RollbackOutlined, SearchOutlined} from '@ant-design/icons';
import {Tag} from 'antd'
import Search from '../Components/Search'
import HerosStatisticTable from "../Components/HeroStatistic.js";
import HerosStatisticCompareTable from '../Components/HeroStatisticCompare'
import TeemoGIF from '../image/teemo.gif'
import displayStatus from "../hook/useDisplayMsg";
import { handleHeroStatistic, handleSelfHeroStatistic } from "../hook/useAPI";

const HeroStatistic = ({setMode, summoner}) => {
    const [selectedHero, setSelectedHero] = useState('')
    const [hero, setHero] = useState('')
    const [data, setData] = useState({})
    const [valid_hero, setValidHero] = useState({})
    const [display, setDisplay] = useState('Single')
    const [your_data, setYourData] = useState({})
    
    const getStatistic = () => {
        // Get Statistic and valid hero
        // Empty the your_data state 
        if(selectedHero.length === 0){
            displayStatus({'type':'error', 'msg': '請先選擇想查詢的英雄'})
            return
        }
        handleHeroStatistic(selectedHero, summoner, setData, setValidHero)
        setDisplay('Single')
        setHero(selectedHero)
        setYourData({})
    }

    const compareData = () => {
        // Get your statistic on a specific hero
        if(display === 'Single'){
            handleSelfHeroStatistic(hero, summoner, setYourData, setDisplay)
        }
        else{
            setDisplay('Single')
        }
    }

    return (
        <div className='HeroStatistic-Main'>
            <div className='HeroStatistic-title'>
                <Tag color='darkred' style={{fontFamily:'Impact, fantacy', 
                    height:'32px', fontSize:'30px'}}>{(display === 'Single')?'查看台服單一英雄平均數據':'召喚師數據與台服平均數據比較表'}</Tag>        
             </div>
            <div className='HeroStatistic-Header'>
                <RollbackOutlined 
                    style={{fontSize: '170%', color: "white"}} 
                    onClick={()=>{setMode('SelectPanel')}}/>
                <div className='HeroStatistic-Search'>
                    <Search setHero={setSelectedHero}/>
                </div>
                <div>
                    {(display === 'Single')?(
                        <Tag onClick={()=>{compareData()}}
                            style={(Object.keys(valid_hero).length && valid_hero[hero])?{}:{display:'none'}}>Compare To Yours</Tag>
                    ) : (
                        <Tag onClick={()=>{compareData()}}>Check TW Avg</Tag>
                    )}
                </div>
                <div>
                    <SearchOutlined 
                        style={{fontSize: '170%' ,color:"white"}}
                        onClick={()=>{getStatistic()}}/>
                </div>
            </div>
            {(display === 'Single')?
                (<div className='HeroStatistic-Pad'>
                    {(Object.keys(data).length == 0)?
                        <img src={TeemoGIF} alt="loading..."/>:
                        <div className='HeroStatistic-Table'>
                            <HerosStatisticTable heroData={data}/>
                        </div>
                    }
                </div>) : (
                <div className='HeroStatistic-Pad-Compare'>
                    {(Object.keys(data).length == 0)?
                        <img src={TeemoGIF} alt="loading..."/>:
                        <div className='HeroStatistic-Table-Compare'>
                            <HerosStatisticCompareTable averageData={data} yourData={your_data}/>
                        </div>
                    }
                </div>
            )}           
        </div>
    )
}

export default HeroStatistic
