// index.js
const express = require('express');
const http = require('http');
const Primus = require('primus');
const ws = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const primus = new Primus(server, { transformer: 'websockets' });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/updatestats', (req, res) => {
  console.log("Render updatestats page");
  res.render('updatestats');
});

app.get('/', (req, res) => {
    console.log("Rendering stats page");
  res.render('stats');
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
