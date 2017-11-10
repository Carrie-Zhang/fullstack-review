import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import ListofRepos from './components/ListofRepos.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }


  componentDidMount() {
    this.refresh();  
  }

  refresh() {
    fetch('/repos')
    .then(results => {
      return results.json();
    })
    .then(data => {
      console.log('data: ', Array.isArray(data));
      this.setState({repos: data});
    })
    .catch(err => {
      console.log(err);
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: 'http://localhost:1128/repos',
      type: 'POST',
      data: JSON.stringify({username: term}),
      contentType: 'application/json',
      success: data => {
        console.log('Success', data);
        this.refresh();
      },
      error: err => {
        console.log('Fail');
        this.refresh();
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <div>{this.state.repos.map(repo => 
        <ListofRepos repo={repo}/> )}
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));