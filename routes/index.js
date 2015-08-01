var express = require('express');
var router = express.Router();
var M2X = require("m2x-tessel");
var m2xClient = new M2X("ef4642f74095db38bb8e4fe0598cbd07");
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
  m2xClient.devices.updateStreams("4690ce92affcda9190579d380675dc6d", streams, function(response) {
      if (response.isError()) {
          console.log("Cannot create stream:", response);
          return;
      }

      //var value_sound = 10;
      //var value_light = 15;
      //console.log("I'm updating stream values! (Press CTRL + C to stop)");
      //var at = new Date().toISOString();
      //var values = {
          //sound:  [ { value: value_sound, timestamp: at } ],
          //light:  [ { value: value_light, timestamp: at } ],
      //};

      //// Write the different values into AT&T M2X
      //m2xClient.devices.postMultiple("4690ce92affcda9190579d380675dc6d", values, function(result) {
          //if (result.isError()) {
              //clearInterval(handleLoop);
              //console.log(result.error());
          //}
      //});
  //});

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
        m2xClient.devices.postMultiple("4690ce92affcda9190579d380675dc6d", values, function(result) {
            if (result.isError()) {
                clearInterval(handleLoop);
                console.log(result.error());
            }
        });

    res.send("success!");
  });
});
module.exports = router;
