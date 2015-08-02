


var Orbit = function () {
};

Orbit.prototype.get = function (path, cb, errorCb) {
  var request = new XMLHttpRequest();
  request.open("GET", path);
  request.setRequestHeader("X-M2X-KEY", "ef4642f74095db38bb8e4fe0598cbd07");
  request.send();
  request.addEventListener("load", cb.bind(request));
  request.addEventListener("error", errorCb);
};

Orbit.prototype.post = function (path, data, cb, errorCb) {
  var request = new XMLHttpRequest();
  request.open("POST", path);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(data));
  request.addEventListener("load", cb.bind(request));
  request.addEventListener("error", errorCb);
};

var orbit = new Orbit();
window.setInterval( function() {
},2000);
orbit.get("http://api-m2x.att.com/v2/devices/4690ce92affcda9190579d380675dc6d/streams/sound", function () {
  var data = JSON.parse(this.response);
  console.log(data.value);

});
