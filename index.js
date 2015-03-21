var WebSocketServer = require("ws").Server;
var http = require("http");
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
  clients.push(ws);
  console.log('websocket connection open');

  ws.on('close', function() {
    console.log('websocket connection close');
  });

  ws.onmessage = function(event) {
    for (var i = 0; i < clients.length; i++) {
      clients[i].send(JSON.stringify(event.data), function() {});
    }
  };
});



