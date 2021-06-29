import {Tag, Table} from 'antd'
import Champion from '../data/Champion.json'
import { swap_key_value } from '../utils'

const HerosStatisticTable = ({heroData}) => {
    let hero_map = swap_key_value(Champion)
    heroData.heroImgURL = 'https://opgg-static.akamaized.net/images/lol/champion/'+heroData.name+'.png'
    const columns = [
        {
            title: 'Number of Matches',
            dataIndex: 'match_num',
            key: 'match_num',
            align: 'center',
        }, 
        {
            title: 'Win Rate(%)',
            dataIndex: 'win_rate', 
            key: 'win_rate',
            align: 'center',
        },
        {
            title: 'KDA',
            dataIndex: 'kda', 
            key: 'kda',
            align: 'center',
        },
        {
            title: 'Damage',
            dataIndex: 'damage', 
            key: 'damage',
            align: 'center',
        },
        {
            title: 'Gold',
            dataIndex: 'gold', 
            key: 'gold',
            align: 'center',
        },
        {
            title: 'Minions',
            dataIndex: 'minion', 
            key: 'minion',
            align: 'center',
        },
    ]
    const rows = new Array(1)
    rows[0] = heroData
    return (<>
        <div className="HeroStatistic-Table-Top">
            <div style={{display: 'flex', flexDirection:'column'}}>
                <img src={heroData.heroImgURL} 
                    style={{height:'150px',width:'150px'}}/>
                <Tag color='rgb(49, 3, 3)' style={{textAlign: 'center',marginTop:'10px', 
                        fontFamily:'FangSong',  width:'150px', fontSize:'20px', height: '25px'}}>
                    {hero_map[heroData.name]}</Tag>
            </div>
            <div className="HeroStatistic-Table-KDA">
                <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <p style={{fontSize:'72px', color:'green'}}>{heroData.kill}</p>
                    <p style={{fontSize:'72px'}}>/</p>
                    <p style={{fontSize:'72px', color:'red'}}>{heroData.death}</p>
                    <p style={{fontSize:'72px'}}>/</p>
                    <p style={{fontSize:'72px', color:'orange'}}>{heroData.assist}</p>
                </div>
                <p style={{fontSize:'30px', position:'relative', top:'-80px', color:'gray'}}>Average K/D/A</p>
            </div>
        </div>
        <div className="HeroStatistic-Table-Bottom">
            <Table columns={columns} dataSource={rows} pagination={false} bordered/> 
        </div>
    </>)
}

export default HerosStatisticTable