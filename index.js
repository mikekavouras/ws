var WebSocketServer = require("ws").Server;
var http = require("http");
var _ = require("underscore");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/"));

var server = http.createServer(app);
server.listen(port);

console.log('server is listening on port %d', port);

var wss = new WebSocketServer({ server: server });
console.log('websocket server created');

var clients = [];
wss.on("connection", function(ws) {
  ws.uuid = guid();
  clients.push(ws);
  post({ user_count : clients.length }, clients);
  console.log('websocket connection open: ' + clients.length);

  ws.on('close', function() {
    var ids = _.map(clients, function(client) { return client.uuid; });
    var idx = _.indexOf(ids, ws.uuid);
    clients.splice(idx, 1);

    post({ user_count : clients.length }, clients);
    console.log('websocket connection close: ' + clients.length);
  });

  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);
    var filtered = _.filter(clients, function(client) { return client.uuid !== ws.uuid; });
    post(data, filtered);
  };
});

function post(data, set) {
  data = JSON.stringify(data);
  for (var i = 0; i < set.length; i++) {
    set[i].send(data);
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
