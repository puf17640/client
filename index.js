const io = require('socket.io-client');

const client = io('http://localhost:3001');
client.on('connect', () => { console.log('connected with id:', client.id) });
client.on('request', (data) => { client.emit('reply', data); });
client.on('disconnect', () => { console.log('disconnected') });