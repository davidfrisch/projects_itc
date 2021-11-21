
var express = require('express');
var cors = require('cors')
var router = express.Router();
const fibonacciLocal = require('../public/src/fibonacci')


/** Connect to MongoDB */
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const clientMgDB = new MongoClient(url);



/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.htm')
});



//using super cool RegEx
router.get('/fibonacci/[0-9]+', cors(), (req, res) => {
  //Putting a setTimeout for UX :)
  setTimeout(async () => {

    let urlSplit = req.url.split('/')
    let number = urlSplit[urlSplit.length - 1]
    if (number > 50 || number < 0) {
      res.status(400).send('The number is not in the accepted range !')
    } else if (number == 42) {
      res.status(400).send("42 is the meaning of life")
    } else {
      let result = fibonacciLocal(number)
      let createdDate = Date.now()
      let jsonOutput = {
        number,
        result,
        createdDate
      }
      
      await clientMgDB.connect()
      const dbFibo = clientMgDB.db('fibonacciHistory')
      dbFibo.collection('results').insertOne(jsonOutput, (err, _) => {
        if (err) throw err
        console.log('New element inserted')
        res.send(jsonOutput)
      }
      )


    }

  }, 1000)
})

/**
  Server sends history of the fibonacci calcaluations
 */
router.get('/getFibonacciResults', cors(), async (req, res) => {
  await clientMgDB.connect()
  const dbFibo = clientMgDB.db('fibonacciHistory')
  let resultsCollection = dbFibo.collection('results')
  resultsCollection.find({}, {})
    .toArray()
    .then(items => {
      let outputJson = { 'results': items }
      res.send(outputJson)
    })
})


module.exports = router;
