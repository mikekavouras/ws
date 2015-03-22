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
  for (var i = 0; i < clients.length; i++) {
    postAll({ user_count : clients.length });
  }
  console.log('websocket connection open: ' + clients.length);

  ws.on('close', function() {
    var ids = _.map(clients, function(client) { return client.uuid; });
    var idx = _.indexOf(ids, ws.uuid);
    clients.splice(idx, 1);
    postAll({ user_count : clients.length });
    console.log('websocket connection close: ' + clients.length);
  });

  ws.onmessage = function(event) {
    postAll({message: event.data});
  };
});

function postAll(data) {
  data = JSON.stringify(data);
  for (var i = 0; i < clients.length; i++) {
    clients[i].send(data);
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


