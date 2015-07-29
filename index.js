var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response) {
  response.send('Hello There!')
});

/*
* This is the main function that recieves post commands from Slack.
* They come in this format:
* {
*   "text": "pkmn battle me",
*   "user": "rvinluan",
*   "channel": "#pkmn_battles" 
* }
* There's more stuff but that's all we care about.
* All error handling is bubbled up to this function and handled here.
* It doesn't distinguish between different types of errors, but it probably should.
*/
app.post('/commands', function(request, response){
  var commands = request.body.text.toLowerCase().split(" ");

  response.send(buildResponse("Now you're thinking with portals!"));
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

//utility functions

/*
* Helper function to build the JSON to send back to Slack.
*/
function buildResponse(text) {
  var json = {
    "text": text,
    "username": "Craft Bot"
  }
  return JSON.stringify(json);
}