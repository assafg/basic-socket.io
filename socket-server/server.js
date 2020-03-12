const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('hello');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.emit('message', {status: 'ok'})

  setInterval(() => {
    socket.emit('time-update', { time: new Date() })
  }, 1000)
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});