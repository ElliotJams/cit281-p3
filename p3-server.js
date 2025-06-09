//Require express framework and instantiate
const express = require('express');
const path = require('path');
const app = express();
 
const{coinCombo, coinValue} = require('./p3-module.js');

const HOST = "localhost";
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());

//CIT Route
app.get('/coincombo', (req, res) => {
  const amount = parseInt(req.query.amount);
  if(isNaN(amount) || amount < 0) {
    res.status(400).type('application/json;charset=utf-8');
    res.json({error: "entry must be a positive number"});
  } else {
    res.status(200).type('application/json; charset=utf-8');
    const data = coinCombo(amount);
    res.json(data);
  }
});

app.get('/coinvalue', (req, res) => {
  const {pennies = 0, nickels = 0, dimes = 0, quarters = 0, halves = 0, dollars = 0} = req.query;
  const coinCounts = {pennies, nickels, dimes, quarters, halves, dollars};
  res.status(200).type('application/json; charset=utf-8');
  const data = coinValue(coinCounts);
  res.json(data);
});

//Handle 404 for all other routes
app.use((req, res) => {
  res.status(404).send('404 Not Found')
});

//Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server runnning at http://${HOST}:${PORT}`)
});