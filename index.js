var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('battle royale is up and running!');
});


app.get('/report', function(request, response) {
  response.send('battle royale is up and running!');
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});