#!/usr/bin/env node
const io = require('socket.io-client'),
	req = require('@aero/centra');

const client = io('http://localhost:5001');
const port = process.argv[2];
client.on('connect', () => console.log(`connected port ${port} with id: ${client.id}`));
client.on('request', async (data) => {
	try {
		const request = req(`http://localhost:${port}${data.path}`, data.method).body(data.body);
		request.reqHeaders = data.headers;
		const response = await request.send()
		client.emit('reply', {
			headers: response.headers,
			body: response.body,
			status: response.statusCode
		});
	} catch(err) {
		client.emit('error', err);
	}
});
client.on('disconnect', () => console.log('disconnected'));