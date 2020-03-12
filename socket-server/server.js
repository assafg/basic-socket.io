const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('hello');
});

io.on('connection', function(socket){
  socket.emit('message', {status: 'ok'})

  socket.on('updateText', ({ text }) => {
    socket.broadcast.emit('updateText', { text });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});