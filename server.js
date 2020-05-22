const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
const app = express();
const key = '5849cd41-a4e1-4661-b99e-8afa6293ed49';

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
if(process.env.NODE_ENV === 'production')
{
  app.use(express.static(path.join(__dirname, '/dist')));
}

app.get('/api/coins', function(req, res) {
  axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {

  headers: 
  {
      'X-CMC_PRO_API_KEY': key
  }})
    .then(function(response) {
      
      res.setHeader('Cache-Control', 'no-cache');
      res.json(response.data);
    })
    .catch(function(error) {
      console.log('api call failed :(', error)
    })
});

app.get('/api/coinsId', function (req, res)
{
  axios.get(' https://api.coinranking.com/v1/public/coins').then( response =>
  {
    res.setHeader('Cache-control', 'no-cache');
    res.json(response.data);
  });
});

app.get('/api/market_data', function(req, res) {
  axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', {
      headers: 
      {
          'X-CMC_PRO_API_KEY': key
      }})
    .then(function(response) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(response.data);
    })
    .catch(function(error) {
      console.log('api call failed :(', error)
    })
});

app.get('/api/coins_graph', function(req, res)
{
  var id = req.query.id;
  var one_year = 0;

  axios.get("https://api.coinranking.com/v1/public/coin/" + id +  "/history/1y").then(response => {
    one_year = response.data.data.history;
    res.send([{"one_year" : one_year}]);
  });
        
});


app.get('/api/exchange_data', function(req, res) {
  axios.get('https://api.coinranking.com/v1/public/exchanges').then(response => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(response.data.data.exchanges);
  });
  
});
app.listen(app.get('port'), function() {
  console.log('Find the server at http://localhost:' + app.get('port'));
});
