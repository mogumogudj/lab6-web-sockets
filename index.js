// index.js
const express = require('express');
const http = require('http');
const Primus = require('primus');
const ws = require('ws');

const app = express();
const server = http.createServer(app);
const primus = new Primus(server, { transformer: 'websockets' });

app.get('/updatestats', (req, res) => {
  res.send('Render your form here');
});

app.get('/', (req, res) => {
  res.send('Render your stats view here');
});

primus.on('connection', (spark) => {
  console.log('New connection:', spark.id);

  spark.on('data', (data) => {
    console.log('Data from client:', data);
    primus.write(data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
