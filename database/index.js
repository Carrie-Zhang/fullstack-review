const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  full_name: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);
//let repo = new Repo({});

let save = (err, repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  if(err) { return console.error(err); }
  console.log(repo);
}

module.exports.save = save;