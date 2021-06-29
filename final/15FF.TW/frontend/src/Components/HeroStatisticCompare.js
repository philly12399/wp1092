import { useState } from "react";
import {Tag, Table} from 'antd'
import {combine_data} from '../utils'

const process_data = (versusData) => {
    let newData = []
    newData.push({'Hero1': versusData.match_num[0], 'key': 'Number of Matches', 'Hero2': versusData.match_num[1]})
    newData.push({'Hero1': versusData.kill[0], 'key': 'Kill', 'Hero2': versusData.kill[1]})
    newData.push({'Hero1': versusData.death[0], 'key': 'Death', 'Hero2': versusData.death[1]})
    newData.push({'Hero1': versusData.assist[0], 'key': 'Assist', 'Hero2': versusData.assist[1]})
    newData.push({'Hero1': versusData.kda[0], 'key': 'KDA', 'Hero2': versusData.kda[1]})
    newData.push({'Hero1': versusData.damage[0], 'key': 'Damage', 'Hero2': versusData.damage[1]})
    newData.push({'Hero1': versusData.gold[0], 'key': 'Gold', 'Hero2': versusData.gold[1]})
    newData.push({'Hero1': versusData.minion[0], 'key': 'Minions', 'Hero2': versusData.minion[1]})
    return newData
}

const winOrloss = (record, person) => {
    switch(record.key) {
        case 'Death':
            return (person === 'Hero1')? (Number(record.Hero1) <= Number(record.Hero2)):(Number(record.Hero1) > Number(record.Hero2))
        default:
            return (person === 'Hero1')? (Number(record.Hero1) >= Number(record.Hero2)):(Number(record.Hero1) < Number(record.Hero2))
    }
}

const HeroStatisticCompareTable = ({averageData, yourData}) => {
    const versusData = combine_data(yourData,averageData)
    versusData.heroImgURL = [
        'https://opgg-static.akamaized.net/images/lol/champion/'+versusData.name[0]+'.png',
        'https://opgg-static.akamaized.net/images/lol/champion/'+versusData.name[1]+'.png'
    ]
    const columns = [
        {
            title: 'Yours',
            dataIndex: 'Hero1',
            key: 'Hero1',
            align: 'center',
            width: '35%',
            render: (text, record) => {
                if(record.key === 'Number of Matches')
                    return <p style={{fontSize:'15px'}}>{text}</p>
                return {
                    props: {
                        style: { background: winOrloss(record,'Hero1') ? "rgba(0,128,0,0.384)" : "rgba(255, 0, 0, 0.384)"}
                    },
                    children: <p style={{fontSize:'15px'}}>{text}</p>
                }
            }
        }, 
        {
            title: '',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            width: '30%',
            render: (text, record) => {
                return {
                    props: {
                        style: {}
                    },
                    children: <p style={{fontSize:'15px', fontFamily:'Impact, fantacy', color: "darkorange"}}>{text}</p>
                }
            }
        },
        {
            title: 'TW Average',
            dataIndex: 'Hero2', 
            key: 'Hero2',
            align: 'center',
            width: '35%',
            render: (text, record) => {
                if(record.key === 'Number of Matches')
                    return <p style={{fontSize:'15px'}}>{text}</p>
                return {
                    props: {
                        style: { background: winOrloss(record,'Hero2') ? "rgba(0,128,0,0.384)" : "rgba(255, 0, 0, 0.384)"}
                    },
                    children:  <p style={{fontSize:'15px'}}>{text}</p>
                }
            }
        }
    ]
    const heroVSheroData = process_data(versusData)
    return (<>
        <div className="HeroVSHero-Table-Top">
            <img src={versusData.heroImgURL[0]}/>
            <div className="HeroVSHero-Top-MiddlePad">
                <div className="HeroVSHero-NameTag"> 
                    <Tag color='orange' style={{textAlign: 'center', width:'100px', fontSize:'30px', height: '25px'}}>
                        Yours</Tag>
                    <p style={{fontSize: '20px', fontStyle:'italic'}}>VS.</p>
                    <Tag color='orange' style={{textAlign: 'center', width:'100px', fontSize:'30px', height: '25px', position:'relative',right:'-8px'}}>
                        Others</Tag>
                </div>
                <div className="HeroVSHero-WinRate">
                    <Tag color={(versusData.win_rate[0] > versusData.win_rate[1])?'green':'red'} style={{fontSize: '25px'}}>{versusData.win_rate[0]+'%'}</Tag>
                    <Tag color='orange' style={{textAlign: 'center', width:'130px', fontSize:'25px', height: '25px', position:'relative',right:'-5px'}}>Win Rate</Tag>
                    <Tag color={(versusData.win_rate[1] > versusData.win_rate[0])?'green':'red'} style={{fontSize: '25px', position:'relative',right:'-8px'}}>{versusData.win_rate[1]+'%'}</Tag>
                </div>
            </div>
            <img src={versusData.heroImgURL[1]}/>
        </div>
        <div className="HeroVSHero-Table-Bottom">
            <Table columns={columns} dataSource={heroVSheroData} pagination={false} bordered/> 
        </div>
    </>)
}

export default HeroStatisticCompareTable