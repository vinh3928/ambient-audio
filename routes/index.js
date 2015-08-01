var express = require('express');
var router = express.Router();
var M2X = require("m2x-tessel");
var m2xClient = new M2X("ef4642f74095db38bb8e4fe0598cbd07");
var streams = {
    "sound": {
        "unit": {
            "label": "sound",
            "symbol": "%" 
        },  
        "type": "numeric"
    },  
    "light": {
        "unit": {
            "label": "light",
            "symbol": "%" 
        },  
        "type": "numeric"
    }   
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tessel', function(req, res, next) {
  res.end("hello");
});

router.post('/tessel', function(req, res, next) {
  m2xClient.devices.updateStreams(config.device, streams, function(response) {
      if (response.isError()) {
          console.log("Cannot create stream:", response);
          return;
      }
      var data = JSON.parse(req.body);

      var value_sound = data.sound;
      var value_light = data.light;
      console.log("I'm updating stream values! (Press CTRL + C to stop)");

      var at = new Date().toISOString();
      var values = {
          temperature:  [ { value: value_sound, timestamp: at } ],
          moisture:  [ { value: value_light, timestamp: at } ],
      };

      // Write the different values into AT&T M2X
      m2xClient.devices.postMultiple(config.device, values, function(result) {
          if (result.isError()) {
              clearInterval(handleLoop);
              console.log(result.error());
          }
      });
  });

  res.send("post works");

});
module.exports = router;
