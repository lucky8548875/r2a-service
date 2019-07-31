var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


router.get('/', (req, res) => {
  req.db.collection('logs').find().toArray((err, results) => {
    if (err) throw err;
    res.send(results)
  })
})

router.post('/', (req, res) => {
  console.log(req.body)
  var parentres = res
  var requestBody = JSON.parse(Object.keys(req.body)[0])
  req.db.collection("logs").insertOne(requestBody, function(err, res) {
    if (err) throw err;
    console.log("1 record inserted");
    parentres.send('')
  });
})


module.exports = router;