import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import axios from 'axios';
import GithubService from './services/GithubService'

// import LoadingSpinner from './components/LoadingSpinner';

import './App.css';
const LoadingSpinner = () => <div>Page is Loading...</div>;

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
      publicRepos: [],
      repoCommits: [],
      repoReleases: [],
      response: [],
      pathName: 'repos'
    };

    this.onClickHandlePath = this.onClickHandlePath.bind(this);
    // this.getData = this.getData.bind(this);
  }

  onClickHandlePath(ev) {
    console.log('onClickHandlePath ====>   ', ev.target);
    let _pathname = ev.target.dataset['gitpathname'];
debugger;
    GithubService.get(baseUrl,_pathname).then((resp) => {
      this.setState((prevState,props) => {
        return{ 
          response: resp,
          pathname: _pathname
        }
      });
    })
  }

  componentDidMount() {
    axios({
      mehod: 'GET',
      url: `${baseUrl}/${this.state.pathName}`,
      timeout: 5000,
    })
      .then( (resp) => {
        const publicRepos = resp.data;
        console.log(resp.data)

        this.setState((prevState,props) => {
          return{ 
            response: publicRepos
          }
        });
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Comapi Github Public Repo's</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={ () => {
              return <RepoList gitRepositories={this.state.response} onClickHandlePathname={this.onClickHandlePath}></RepoList>
            }} />
            <Route path='/releases/:id' render={ () => {
              return <RepoReleases gitReleases={this.state.response} onClickHandlePathname={this.onClickHandlePath}></RepoReleases>
            }} />
            <Route path='/commits/:id'  render={ () => {
              return <RepoCommit gitCommits={this.state.response} onClickHandlePathname={this.onClickHandlePath}></RepoCommit>
            }} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
