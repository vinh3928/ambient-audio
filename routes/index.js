require('dotenv').load();
var express = require('express');
var router = express.Router();
var M2X = require("m2x-tessel");
var m2xClient = new M2X(process.env.M2X_API_KEY);
var streams = {
    "sound": {
        "unit": {
            "label": "decible",
            "symbol": "%" 
        },  
        "type": "numeric"
    },  
    "light": {
        "unit": {
            "label": "rays",
            "symbol": "%" 
        },  
        "type": "numeric"
    }   
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('post', { title: 'Express' });
});

router.get('/tessel', function(req, res, next) {
  res.end("hello");
});

router.post('/tessel', function(req, res, next) {
  m2xClient.devices.updateStreams(process.env.M2X_DEVICE_KEY, streams, function(response) {
      if (response.isError()) {
          console.log("Cannot create stream:", response);
          return;
      }

    var value_sound = +req.body.sound;
    var value_light = +req.body.light;
    var handleLoop;
        console.log("I'm updating stream values! (Press CTRL + C to stop)");

        var at = new Date().toISOString();
        var values = {
            sound:  [ { value: value_sound, timestamp: at } ],
            light:  [ { value: value_light, timestamp: at } ],
        };

        // Write the different values into AT&T M2X
        m2xClient.devices.postMultiple(process.env.M2X_DEVICE_KEY, values, function(result) {
            if (result.isError()) {
                clearInterval(handleLoop);
                console.log(result.error());
            }
        });

    res.send("success!");
  });
});
module.exports = router;
