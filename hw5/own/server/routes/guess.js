import express from 'express'
import getNumber from '../core/getNumber'
import {writeLog} from '../server'
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
  writeLog("start number="+getNumber(true));
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    writeLog('illegal input "'+req.query.number+'"');
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    writeLog("guess "+guessed);
    var s;
    if(guessed>number) s="Smaller";
    else if(guessed<number) s="Bigger";
    else if(guessed === number){ s="Equal";  writeLog("end-game");}
    res.send({ msg: s })
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  writeLog("restart number="+getNumber(true));
  res.json({ msg: 'The game has restarted.' })
})
export default router
