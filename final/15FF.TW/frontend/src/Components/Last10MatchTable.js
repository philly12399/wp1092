import {Table, Tag} from 'antd'
import Champion from '../data/Champion.json'
import { swap_key_value } from '../utils'

const MatchTable = ({matchData}) => {
    matchData = matchData.map((data)=>{
        data.heroImageURL = 'https://opgg-static.akamaized.net/images/lol/champion/'+data.champion+'.png'
        return data
    })
    const hero_map = swap_key_value(Champion)
    console.log(hero_map)
    const columns = [
        {
            title: 'Champion',
            dataIndex: 'heroImageURL',
            key: 'heroImageURL',
            align: 'center',
            render: (text, record) => {
                return (
                    <div>
                        <img src={record.heroImageURL}/><br/><br/>
                        <Tag color='darkred' style={{fontFamily:'Impact, fantacy', fontSize:'15px'}}>{hero_map[record.champion]}</Tag>
                    </div>
                )
            }
        },
        {
            title: 'Result',
            dataIndex: 'win', 
            key: 'win',
            align: 'center',
            render: (text, record) => {
                return {
                    props: {
                      style: { background: text ? "rgba(0,128,0,0.384)" : "rgba(255, 0, 0, 0.384)" }
                    },
                    children: <div style={{fontSize: '20px'}}>{text? 'WIN':'LOSS'}</div>
                };
            }  
        },
        {
            title: 'Game map',
            dataIndex: 'gamemap', 
            key: 'gamemap',
            align: 'center',
        },
        {
            title: 'Level',
            dataIndex: 'level', 
            key: 'level',
            align: 'center'
        },
        {
            title: 'K/D/A',
            dataIndex: 'kda', 
            key: 'kda',
            align: 'center',
            render: (text, record) => {
                return (
                    <div>
                        <br/>
                        <br/>
                        <p>{record.kill+'/'+record.death+'/'+record.assist}</p>
                        <p>{'('+record.kda+')'}</p>
                    </div>
                )
            }
        },
        {
            title: 'Damage',
            dataIndex: 'damage', 
            key: 'damage',
            align: 'center'
        },
        {
            title: 'Gold',
            dataIndex: 'gold', 
            key: 'gold',
            align: 'center'
        },
        {
            title: 'Minions',
            dataIndex: 'minion', 
            key: 'minion',
            align: 'center'
        },
        {
            title: 'Game time',
            dataIndex: 'gametime', 
            key: 'gametime',
            align: 'center'
        }

    ];
    return (
        <div className="Last10Match-Table">
            <Table columns={columns} dataSource={matchData} bordered/> 
        </div>
    )
}

export default MatchTable