const combine_data = (data1, data2) => {
    console.log(data1, data2)
    const newdata = {}
    newdata.assist = [data1.assist, data2.assist]
    newdata.death = [data1.death, data2.death]
    newdata.gold = [data1.gold, data2.gold]
    newdata.kda = [data1.kda, data2.kda]
    newdata.kill = [data1.kill, data2.kill]
    newdata.minion = [data1.minion, data2.minion]
    newdata.name = [data1.name, data2.name]
    newdata.win_rate = [data1.win_rate, data2.win_rate]
    newdata.match_num = [data1.match_num, data2.match_num]
    newdata.damage = [data1.damage, data2.damage]
    return newdata
}

const cal_data_avg = (match_data) => {
    console.log(match_data)
    let avg_stats = {
        'assist': 0,
        'damage': 0,
        'death': 0,
        'gold': 0,
        'kda': 0,
        'kill': 0,
        'level': 0,
        'minion': 0,
        'win_rate': 0
    }
    let hero_stats = {}
    for(var i = 0; i < match_data.length; i++){
        avg_stats.assist += match_data[i].assist/match_data.length
        avg_stats.damage += match_data[i].damage/match_data.length
        avg_stats.death += match_data[i].death/match_data.length
        avg_stats.gold += match_data[i].gold/match_data.length
        avg_stats.kill += match_data[i].kill/match_data.length
        avg_stats.level += match_data[i].level/match_data.length
        avg_stats.minion += match_data[i].minion/match_data.length
        if(match_data[i].win)
            avg_stats.win_rate += 1/match_data.length
    }
    avg_stats['kda'] = (avg_stats['kill']+avg_stats['assist'])/avg_stats['death']
    const keys = Object.keys(avg_stats)
    for(var i = 0; i < keys.length; i++){
        if(keys[i] === 'kill' || keys[i] === 'assist' || keys[i] === 'death' || keys[i] == 'level'){
            avg_stats[keys[i]] = avg_stats[keys[i]].toFixed(1);
            continue;
        }
        else if(keys[i] === 'kda'){
            console.log(avg_stats[keys[i]])
            avg_stats[keys[i]] = avg_stats[keys[i]].toFixed(2);
        }
        else{
            if(keys[i] != 'win_rate')
                avg_stats[keys[i]] = avg_stats[keys[i]].toFixed(0)
            else 
                avg_stats[keys[i]] = avg_stats[keys[i]].toFixed(4)*100
        }
    }
    return avg_stats
}

const swap_key_value = (obj) => {
    const ret = {};
    Object.keys(obj).forEach(key => {
        ret[obj[key]] = key;
    });
    return ret;
}

export {combine_data, cal_data_avg, swap_key_value}