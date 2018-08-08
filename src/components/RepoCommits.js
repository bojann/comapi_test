import React,{Component} from 'react';
import { Row, Grid, Col, ListGroupItem, ListGroup, Media, Button} from 'react-bootstrap/lib';
import defaultAvatar from '../assets/pikachu_avatar.png';
import GithubService from '../services/GithubService';
import {Link} from 'react-router-dom';

//gitCommits
class RepoCommits extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gitCommits: []
        }

        this.loadContent = this.loadContent.bind(this);
    }

    loadContent() {
        const BASE_URL = 'https://api.github.com/repos/comapi';
        let pathname = window.location.pathname;
        let regExPathname = pathname.match(/(\/[\w\-]+){2}/)[1];
        let url = (this.props.repoUrl === '/') ? `${BASE_URL}${regExPathname}/commits` : this.props.repoUrl;

        GithubService.getData(url)
            .then((resp) => {
                this.setState((prevState,props) => {
                    return {
                        gitCommits: resp,
                        url: url
                    }
                });
            })
            .catch( (err) => {
                console.error(`Parsing faild, ${err}`);
            });
    }

    componentDidMount(prevProps, prevState) {
        this.loadContent()
    }

    render() {
        return(
            <div className="repo-commits">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={2} md={2} >
                            <Link to={'/'}><Button>Back to repo list</Button></Link>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <h2>List of commits:</h2>
                        <ListGroup>
                            <CommitList gitCommits={this.state.gitCommits} />
                        </ListGroup>
                    </Row>
                </Grid>
            </div>
        )
    }

}

function CommitList(props) {
    return props.gitCommits.map( (commitItem) => {
        if( !commitItem.commit && !commitItem.committer ) {
            return false;
        }

        return(
            <Col xs={6} md={12} key={commitItem.sha}>
                <ListGroupItem bsStyle="info" className="repo-list-item">
                  <Media>
                      <Media.Left align="top">
                          {(commitItem.committer && commitItem.committer.avatar_url)
                          ?
                          <img width={64} height={64} src={commitItem.committer.avatar_url}  alt="thumbnail" />
                          :
                          <img width={64} height={64} src={defaultAvatar}  alt={defaultAvatar} />
                          }
                      </Media.Left>
                      <Media.Body>
                          <Media.Heading>Name: {commitItem.commit.committer.name}</Media.Heading>
                          <p>Commit message: {commitItem.commit.message}</p>
                          <p>Date of commit: {commitItem.commit.committer.date}</p>
                      </Media.Body>
                    </Media>
                </ListGroupItem>
            </Col>
        )
    });
}

export default RepoCommits;
