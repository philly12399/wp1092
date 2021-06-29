import displayStatus from "./useDisplayMsg";
import axios from '../api'

const handleSignIn = async (name, setSignedIn, setLoading) => {
    console.log("mutation "+name)
    const {data: { message },} = await axios.post('/api/create-summoner', {
        name
    });
    console.log(message);
    if(message === 'Mutaion success.'){
        setSignedIn(true)
        setLoading(false)
        displayStatus({'type':'success', 'msg':'成功登錄'})
    }
    else{
        setLoading(false)
        if(message === 'Error: Garena server down.')
            displayStatus({'type':'error', 'msg': '伺服器忙碌中，請重新再試'})
        else if(message === "Error: The summoner name doesn't exist.")
            displayStatus({'type':'error', 'msg': '召喚師名稱不存在，請重新輸入'})
        else if(message === 'Error: The summoner has no match.')
            displayStatus({'type':'error', 'msg': '此召喚師尚無任何可供查詢的對戰紀錄'})
        else if(message === 'Error: The summoner name need to be exactly same.')
          displayStatus({'type':'error', 'msg': '召喚師名稱需完全相符(大小寫)'})
        else 
            displayStatus({'type':'error', 'msg': '發生錯誤，請重新再試'})
    }
}

const handleHeroVSHero = async (champion1, champion2, setData) => {
    const {
      data: { message, stats },
    } = await axios.get('/api/query1',{ params:{champion1,champion2}}) 
    if(message === 'Query success.'){
      displayStatus({'type':'success', 'msg': '成功獲得數據'})
      setData(stats)
    }
    else{
        if(message === "Error: No match between")
            displayStatus({'type':'error', 'msg': '此兩位英雄尚無任何對位數據'})
        else 
            displayStatus({'type':'error', 'msg': '發生錯誤'})
      setData({})
    }
};

const handleHeroStatistic = async (champion, name, setData, setValidHero) => {
    const {
      data: { message, stats, used },
    } = await axios.get('/api/query2',{params: {champion,name}})
    console.log(message, stats)
    if(message === 'Query success.'){
      displayStatus({'type':'success', 'msg': '成功獲得數據'})
      stats.name = champion
      setData(stats)
      setValidHero(used)
    }
    else{
      console.log(message)
      if(message === "Error: No data of this champion.")
        displayStatus({'type':'error', 'msg': '該位英雄尚無任何數據'})
      setData([])
      setValidHero({})
    }
};

const handleLast10Match = async (name, setData) => {
    const {
      data: { message, match },
    } = await axios.get('/api/query3',{params: {name}}) 
    console.log(match[0]);
    if(message === "Query success.")
      displayStatus({'type':'success', 'msg': '成功獲得近期對戰紀錄'})
    else
      displayStatus({'type':'error', 'msg': '發生錯誤'})
    setData(match)
};

const handleSelfHeroStatistic = async (champion, name, setYourData, setDisplay) => {
    const {
      data: { message, stats },
    } = await axios.get('/api/query4',{params: {champion,name}})
    if(message === 'Query success.'){
      displayStatus({'type':'success', 'msg': '成功獲得您的該角色數據'})
      stats.name = champion
      setYourData(stats)
      setDisplay('Compare')
    }
    else{
      displayStatus({'type':'error', 'msg': '發生錯誤'})
      setYourData({})
      setDisplay('Single')
    }
};

export {handleSignIn, handleHeroStatistic, handleHeroVSHero, handleLast10Match, handleSelfHeroStatistic}