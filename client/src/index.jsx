import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: 'http://localhost:1128/repos',
      type: 'POST',
      data: JSON.stringify({username: term}),
      contentType: 'application/json',
      success: function(data) {
        console.log('Success', data);
      },
      error: function(err) {
        console.log('Fail');
      }
    });
  }

  componentDidMount() {
    fetch('http://localhost:1128/repos')
    .then(results => {
      return results.json();
    })
    .then(data => {
      console.log('data: ', data);
      this.setState({repos: data});
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <ul>
        {this.state.repos.map(function(repo){
            return <li key={repo.id}>{repo}</li>;
        })}
      </ul>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));