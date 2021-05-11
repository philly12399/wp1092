let startTime
var fs = require('fs')

const getTime = () => {
    const currDate = new Date();
    const year = currDate.getFullYear();
    const month = currDate.getMonth();
    const day = currDate.getDay();
    const hours = currDate.getHours();
    const minutes = currDate.getMinutes();
    const seconds = currDate.getSeconds();

    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

const logstart = (number, r) => {
    const content = `${r ? 'restart' : 'start'} number=${number} ${getTime()}\n`;
    if(startTime === undefined){
        startTime = getTime()
        fs.writeFile(startTime+'.log', content, function (err) {
            console.log(err)
        })
    }
    else{
        fs.appendFile(startTime+'.log', content, function (err) {
            console.log(err)
        })
    }
}

const logguess = (guessed) => {
    const content = `guess ${guessed} ${getTime()}\n`;
    fs.appendFile(startTime+'.log', content, function (err) {
        console.log(err)
    })
}

const endgame = () => {
    const content = `end-game\n`;
    fs.appendFile(startTime+'.log', content, function (err) {
        console.log(err)
    })
}

export { logstart, logguess, endgame }