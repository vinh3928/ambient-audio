
var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var http = require('http');
var querystring = require('query-string');


var ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', function () {
 // Get points of light and sound data.
  setInterval( function () {
    ambient.getLightLevel( function(err, ldata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sdata) {
        if (err) throw err;
  console.log("lightdata", ldata);
  console.log("sounddata", sdata);
// http call
  var postData = querystring.stringify({
    'light' : ldata,
    'sound' : sdata
  });

  var options = {
    hostname: 'salty-mesa-5708.herokuapp.com',
    port: 80,
    path: '/tessel',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write(postData);
  req.end();

//
      });
    });
  }, 2000); // The readings will happen every .5 seconds unless the trigger is hit
});
