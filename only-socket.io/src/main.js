require('./config');

const server = require('http').createServer();
const IO = require('socket.io')(server);

const Online = require('./modules/online');
const User = require('./modules/user');
const Chat = require('./modules/chat');

IO.on('connection', client => {

  let { username } = client.handshake.query
  , validateUser = false;
  
  if (username){
    let user = User.findOne(username);
    validateUser = !!user;
  }

  client.emit('user validate login', validateUser);

  client.on('user register', data => {
    if (validateUser){
      client.emit('user register', { error : 'User logged in, cannot register.' });
      return;
    }

    let { username, password } = data;

    if (!username){
      client.emit('user register', { error : 'Username invalid.' });
      return;
    }

    let regUser = User.findOne(username);

    if (regUser){
      client.emit('user register', { error : 'Username already used.' });
      return;
    }

    User.insert(username, password);
    client.emit('user register', { username });
    client.broadcast.emit('user online register', { username });
  });

  client.on('user require data', () => {
    client.emit('user require data', {
      users : User.find(),
      online : Online.find(),
      message : Chat.find(0, 50)
    });
  });


});

server.listen(PORT, err => {
  if (err) throw err;
  console.log('Server listen on port', PORT);
});