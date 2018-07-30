import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import axios from 'axios';

// import LoadingSpinner from './components/LoadingSpinner';

import './App.css';
const LoadingSpinner = () => <div>Loading...</div>;

const baseUrl = 'https://api.github.com/orgs/comapi';
const RepoList = Loadable({
  loader: () => import('./components/RepoList'),
  loading: LoadingSpinner,
});
const RepoCommit = Loadable({
  loader: () => import('./components/RepoCommit'),
  loading: LoadingSpinner,
});
const RepoReleases = Loadable({
  loader: () => import('./components/RepoReleases'),
  loading: LoadingSpinner,
});


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      publicRepos: []
    };
    // this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    axios({
      mehod: 'GET',
      url: `${baseUrl}/repos`,
      timeout: 5000,

    })
      .then(res => {
        const publicRepos = res.data;
        console.log(res.data)
        this.setState({ publicRepos });
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Comapi Github Public Repos</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => <RepoList gitRepositories={this.state.publicRepos}></RepoList>} />
            <Route exact path='/releases' component={RepoReleases} />
            <Route exact path='/commits' component={RepoCommit} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
