import '../App.css';
import {useState} from 'react';
import {Tag, Button} from 'antd';
import HeroVersusHero from './heroVShero'
import HeroStatistic from './heroStatistic';
import Last10Match from './Last10Match'
import WebUsage from '../Components/WebUsage'

const HomePage = ({summoner, setMe, setSignedIn}) => {
    const [mode, setMode] = useState('SelectPanel')

    const changeMode = (selectedMode) => {
        setMode(selectedMode)       
    }

    const handleSignOut = () => {
        setSignedIn(false)
        setMe('')
    }

    if(mode === 'SelectPanel'){
        return (<>
                <div className='HomePage-title'>
                    <Tag color='darkred' style={{fontFamily:'Impact', fontSize:'50px', 
                            height:'40px'}}>Please select a service</Tag> 
                </div>
                <div className='Select-Pad'>
                    <span><Button onClick={()=>{changeMode('HerosVersusStatistic')}}>查看台服英雄對位數據</Button></span>
                    <span><Button onClick={()=>{changeMode('HerosStatistic')}}>查看台服單一英雄數據</Button></span>
                    <span><Button onClick={()=>{changeMode('Last10Match')}}>查看近期對戰紀錄</Button></span>
                </div>
                <div className='HomePage-Bottom'>
                    <Tag color='darkred' style={{fontFamily:'Impact', fontSize:'20px', 
                            height:'25px'}} 
                            onClick={()=>{handleSignOut()}}>Logout Button</Tag>
                    <Tag color='darkred' style={{fontFamily:'Impact', fontSize:'20px', 
                            height:'25px'}}>{'Summoner ID: '+summoner}</Tag> 
                    <Tag color='darkred' style={{fontFamily:'Impact', fontSize:'20px', 
                            height:'25px'}}
                            onClick={()=>{changeMode('Web-Usage')}}>Web Usage</Tag>     
                </div>
        </>)
    }
    else if(mode === 'HerosVersusStatistic'){
        return (
            <>
                <HeroVersusHero setMode={setMode}/>
            </>
        )
    }
    else if(mode === 'HerosStatistic'){
        return (
            <>
                <HeroStatistic setMode={setMode} summoner={summoner}/>
            </>
        )
    }
    else if(mode === 'Last10Match'){
        return (
            <>
                <Last10Match summoner={summoner} setMode={setMode}/>
            </>
        )
    }
    else if(mode === 'Web-Usage'){
        return (
            <>
                <WebUsage summoner={summoner} setMode={setMode}/>
            </>
        )
    }
}

export default HomePage;



