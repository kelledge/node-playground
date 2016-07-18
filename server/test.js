var http = require('http')
var websocket = require('websocket-stream')
var timeStream = require('./timeStream');
var sineTransform = require('./sineTransform');

var server = http.createServer()
var wss = websocket.createServer({server: server}, handle)

ts = timeStream(0, 1000);
st = sineTransform(5000, 100);
ts.begin()

server.listen(8888)

function handle(stream) {
  ts.pipe(st).pipe(stream)
}

