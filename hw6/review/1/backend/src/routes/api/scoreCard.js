import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard.js';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    const { name, subject, score } = req.body;
    const filter = {
      name: name,
      subject: subject
    };
    const update = {
      score: score
    };

    await ScoreCard.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
        rawResult: true
    }).exec( (e, r) => {
        if (e) throw e;
        const msg = (r.lastErrorObject.updatedExisting)? 
                      `Updating (${name}, ${subject}, ${score})` : 
                      `Adding (${name}, ${subject}, ${score})`;
        res.send({message: msg, card: JSON.stringify(r.value)})
    });
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/delete-card', async function (req, res) {
  try {
    await ScoreCard.deleteMany({});
    console.log("ScoreCard clean up!");
    res.json({ message: 'Database cleared'});
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query-card', async function (req, res) {
  try {
    const {queryType, queryString} = req.query;
    const filter = (queryType === 'name')?{name: queryString}:{subject: queryString};
    await ScoreCard.find(filter).exec((e, r) => {
      r = r.map((m) => `Name: ${m.name} - Subject: ${m.subject}: ${m.score}`);
      if (r.length === 0) r = null;
      res.send({messages: r, message: `${queryType}(${queryString}) not found!`});
    });
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

export default router;
