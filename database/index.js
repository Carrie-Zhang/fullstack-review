const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {
  	type: String,
  	index: { unique: true },
  	required: true,
  	dropDups: true
  },
  full_name: {
  	type: String,
    index: { unique: true },
  	required: true
  },
  watchers: {
  	type: Number,
  	required: true
  }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //console.log('inside of db repos: ', repos);
  repos.forEach(repo => {
  	repo = new Repo({id: repo.id, full_name: repo.full_name, watchers: repo.watchers});
  	repo.save((err, repo) => {
  		if (err) { console.log(err); }
  		else { console.log('save success', repo); }
  	});
  });
}

let retrieve = () => {
    return Repo.find((err, repos) => {
      if (err) { console.log(err); }
    })
    .sort({watchers: -1})
    .limit(25);
}

module.exports.save = save;
module.exports.retrieve = retrieve;