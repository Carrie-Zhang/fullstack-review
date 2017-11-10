const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github');
const database = require('../database/index');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  console.log('inside of server req.body.username: ', req.body.username);

  getReposByUsername.getReposByUsername(req.body.username, repos => {
  	//console.log('inside of server getReposByUsername', repos);
  	database.save(JSON.parse(repos));
  });

  res.end();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  //get the repos from the database
  //then send back to client with top 25 repos
  	
  database.retrieve()
  .then(results => {
  	res.send(results);	
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

