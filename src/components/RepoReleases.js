import React,{Component} from 'react';
import { Row, Grid, Col, ListGroupItem, ListGroup, Media, Button} from 'react-bootstrap/lib';
import defaultAvatar from '../assets/pikachu_avatar.png';
import GithubService from '../services/GithubService';
import {Link} from 'react-router-dom';

class RepoResources extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gitReleases: []
        }

        this.loadContent = this.loadContent.bind(this);
    }

    loadContent() {
        const BASE_URL = 'https://api.github.com/repos/comapi';
        let pathname = window.location.pathname;
        let regExPathname = pathname.match(/(\/[\w\-]+){2}/)[1];
        let url = (this.props.repoUrl === '/') ? `${BASE_URL}${regExPathname}/releases` : this.props.repoUrl;

        GithubService.getData(url)
            .then((resp) => {
                this.setState((prevState,props) => {
                    return {
                        gitReleases: resp,
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
                        <h2>List of Releases:</h2>
                        <ListGroup>
                            <ReleaseList gitReleases={this.state.gitReleases} />
                        </ListGroup>
                    </Row>
                </Grid>
            </div>
        )
    }

}

function ReleaseList(props) {
    if(!props.gitReleases.length) {
        return (
            <Col xs={6} md={12}>
                <ListGroupItem>
                    <span className="empty-response">There are no releases from this repository</span>
                </ListGroupItem>
            </Col>
        )
    }

    return props.gitReleases.map( (releaseItem) => {
        if( !releaseItem ) {
            return false;
        }

        let publishTime = new Date(releaseItem.published_at).toDateString();

        return(
            <Col xs={6} md={12} key={releaseItem.node_id}>
                <ListGroupItem bsStyle="info" className="repo-list-item">
                  <Media>
                      <Media.Left align="top">
                          {(releaseItem.author && releaseItem.author.avatar_url)
                          ?
                          <img width={64} height={64} src={releaseItem.author.avatar_url}  alt="thumbnail" />
                          :
                          <img width={64} height={64} src={defaultAvatar}  alt={defaultAvatar} />
                          }
                      </Media.Left>
                      <Media.Body>
                          <Media.Heading>Name: {releaseItem.name}</Media.Heading>
                          <p>Author username: {releaseItem.author.login}</p>
                          <p>Tag: {releaseItem.tag_name}</p>
                          <p>Publish date: {publishTime}</p>
                          <a href={releaseItem.html_url} target="_blank">>> {releaseItem.name}</a>
                      </Media.Body>
                    </Media>
                </ListGroupItem>
            </Col>
        )
    });
}

export default RepoResources;
