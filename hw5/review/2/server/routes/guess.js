import express from 'express'
import getNumber from '../core/getNumber'
import moment from 'moment'

// create log file
const fs = require('fs');
if( !fs.existsSync(`server/log`) ){
  fs.mkdirSync(`server/log`);
}
let dateStr = moment().format('YYYY-MM-DD-HH-mm');
console.log(dateStr);
const fileName = `./server/log/${dateStr}.log`;
fs.writeFile(fileName, '', err=>(err ? console.log(err) : console.log('sucess to log')));

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const number = getNumber(true);
  res.json({ msg: 'The game has started.' });

  // log
  dateStr = moment().format('YYYY-MM-DD-HH-mm-ss');
  console.log(dateStr);
  fs.appendFile(fileName, `start number=${number} ${dateStr}\n`, err=>(err ? console.log(err) : console.log('sucess to log')));
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if(guessed === number)
    {
      res.send({ msg: 'Equal' })
    } else if(guessed <= number) {
      res.send({ msg: 'Bigger' })
    } else if(guessed >= number) {
      res.send({ msg: 'Smaller' })
    }
  }

  // log
  if(guessed === number)
  {
    fs.appendFile(fileName, `end-game\n`, err=>(err ? console.log(err) : console.log('sucess to log')));
  }
  else
  {
    dateStr = moment().format('YYYY-MM-DD-HH-mm-ss');
    console.log(dateStr);
    fs.appendFile(fileName, `guess ${guessed} ${dateStr}\n`, err=>(err ? console.log(err) : console.log('sucess to log')));
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (req, res) => {
  const number = getNumber(true);
  res.json({ msg: 'The game has started.' });

  // log
  dateStr = moment().format('YYYY-MM-DD-HH-mm-ss');
  console.log(dateStr);
  fs.appendFile(fileName, `restart number=${number} ${dateStr}\n`, err=>(err ? console.log(err) : console.log('sucess to log')));
})

export default router
