import React, { Component } from 'react';
import {BrowserRouter,Link, Route, Switch} from 'react-router-dom';
import {Row, Button} from 'react-bootstrap/lib';
import Loadable from 'react-loadable';

// import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const LoadingSpinner = () => <div>Page is Loading...</div>;

const RepoView = Loadable({
  loader: () => import('./components/RepoView'),
  loading: LoadingSpinner,
});
const RepoCommits = Loadable({
  loader: () => import('./components/RepoCommits'),
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
      repoUrl: '/'
    };

    this.onClickHandlePath = this.onClickHandlePath.bind(this);
  }

  onClickHandlePath(ev) {
    const BASE_URL = 'https://api.github.com'
    const FIRM = '/comapi';
    let gitscope = '/orgs';
    let pathnamePart = ev.target.dataset['gitpathname'];

    if((pathnamePart.indexOf('releases') !== -1) || (pathnamePart.indexOf('commits') !== -1)) {
      gitscope = '/repos';
    }
    let url = `${BASE_URL}${gitscope}${FIRM}/${pathnamePart}`;

    this.setState((prevState,props) => {
      console.log('App setState prevState :', prevState);
      return{
        repoUrl: url
      }
    });
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
              return <RepoView repoUrl={this.state.repoUrl} onClickHandlePathname={this.onClickHandlePath}></RepoView>
            }} />
            <Route path='/releases/:id' render={ () => {
              return <RepoReleases repoUrl={this.state.repoUrl} onClickHandlePathname={this.onClickHandlePath}></RepoReleases>
            }} />
            <Route path='/commits/:id'  render={ () => {
              return <RepoCommits repoUrl={this.state.repoUrl} onClickHandlePathname={this.onClickHandlePath}></RepoCommits>
            }} />
          </Switch>
        </BrowserRouter>
        <Row>
          <Button>
              <Link to={commitslink} data-gitpathname={gitCommitsPath} onClick={onClickHandlePathname}>Back to repo list</Link>
          </Button>
        </Row>
      </div>
    )
  }
}

export default App;
