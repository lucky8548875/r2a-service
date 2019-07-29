var express = require('express');
var router = express.Router();

/* Login request */
router.post('/', function (req, res) {

  // Declare parent response
  var parentres = res

  req.body = JSON.parse(Object.keys(req.body)[0])
  console.log(req.body)
  // Find a match (unsecure method for now)
  req.db.collection("Users").findOne({
    username: { $eq: req.body.username },
    password: { $eq: req.body.password }
  }, (err, res) => {
    if (err) throw err;

    // If user found
    if (res && res.active) {

      // Store values
      var type = res.type
      var username = res.username
      var name = res.name

      // Generate a token
      var rand = function() {
        return Math.random().toString(36).substr(2); // remove `0.`
      };
      var token = rand() + rand(); // to make it longer

      // Create a session
      req.db.collection("sessions").insertOne({
        username: res.username,
        token,
        ua: req.headers['user-agent'],
        type

      }, function (err, res) {
        if (err) throw err;
        console.log("1 record inserted");

        // Render auth template
        console.log({
          username,
          token,
          type,
          name
        })
        parentres.send({
          username,
          token,
          type,
          name
        })
      });

    }


    else
      parentres.send({error: 'invalid credentials'})

  });



});

module.exports = router;
