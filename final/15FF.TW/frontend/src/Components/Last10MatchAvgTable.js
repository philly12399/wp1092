import {Tag, Table} from 'antd'
import {cal_data_avg} from '../utils'

const Last10MatchAvgTable = ({matchData}) => {
    matchData = cal_data_avg(matchData)
    matchData.heroImgURL = 'https://opgg-static.akamaized.net/images/lol/champion/'+'Garen.png'
    matchData.name = 'Garen'
    const columns = [
        {
            title: 'Win Rate(%)',
            dataIndex: 'win_rate', 
            key: 'win_rate',
            align: 'center',
        },
        {
            title: 'Level',
            dataIndex: 'level', 
            key: 'level',
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
    rows[0] = matchData
    return (<>
        <div className="Last10MatchAvg-Table-Top">
            <div className="Last10MatchAvg-Table-KDA">
                <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <p style={{fontSize:'80px', color:'green'}}>{matchData.kill}</p>
                    <p style={{fontSize:'80px'}}>/</p>
                    <p style={{fontSize:'80px', color:'red'}}>{matchData.death}</p>
                    <p style={{fontSize:'80px'}}>/</p>
                    <p style={{fontSize:'80px', color:'orange'}}>{matchData.assist}</p>
                </div>
                <p style={{fontSize:'30px', position:'relative', top:'-100px', color:'gray'}}>Average K/D/A</p>
            </div>
        </div>
        <div className="Last10MatchAvg-Table-Bottom">
            <Table columns={columns} dataSource={rows} pagination={false} bordered/> 
        </div>
    </>)
}

export default Last10MatchAvgTable