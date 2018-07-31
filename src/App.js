import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import GithubService from './services/GithubService'

// import LoadingSpinner from './components/LoadingSpinner';

import './App.css';
const LoadingSpinner = () => <div>Page is Loading...</div>;

const BASE_URL = 'https://api.github.com';
const FIRM = '/comapi';
let gitscope = '/orgs';
let pathnamePart = 'repos';
let defaultUrl = `${BASE_URL}${gitscope}${FIRM}/${pathnamePart}`;

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
      responseData: [],
      routeUrl: defaultUrl
    };

    this.onClickHandlePath = this.onClickHandlePath.bind(this);
  }

  onClickHandlePath(ev) {
    console.log('onClickHandlePath ====>   ', ev.target);
    let pathnamePart = ev.target.dataset['gitpathname'];

    if((pathnamePart.indexOf('releases') !== -1) || (pathnamePart.indexOf('commits') !== -1)) {
      gitscope = '/repos';
    }
    let url = `${BASE_URL}${gitscope}${FIRM}/${pathnamePart}`;

    debugger;
    GithubService.getData(url)
      .then((resp) => {
          this.setState((prevState,props) => {
            return{
              responseData: resp
            }
          });
      })

    this.setState((prevState,props) => {
      return{
        routeUrl: url
      }
    });
  }

  componentDidMount() {
    debugger;
    GithubService.getData(this.state.routeUrl)
      .then((resp) => {
          this.setState((prevState,props) => {
            return{
              responseData: resp
            }
          });
      })
    // axios({
    //   mehod: 'GET',
    //   url: url,
    //   timeout: 5000,
    // })
    //   .then( (resp) => {
    //     let publicRepos = resp.data;
    //
    //     this.setState((prevState,props) => {
    //       return{
    //         response: publicRepos
    //       }
    //     });
    //   })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Comapi Github Public Repos</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={ () => {
              return <RepoList gitRepositories={this.state.responseData} onClickHandlePathname={this.onClickHandlePath}></RepoList>
            }} />
            <Route path='/releases/:id' render={ () => {
              return <RepoReleases gitReleases={this.state.responseData} onClickHandlePathname={this.onClickHandlePath}></RepoReleases>
            }} />
            <Route path='/commits/:id'  render={ () => {
              return <RepoCommit gitCommits={this.state.responseData} onClickHandlePathname={this.onClickHandlePath}></RepoCommit>
            }} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
