import React, {Componenet} from 'react';
import {Col, Grid, Row, ListGroup, ListGroupItem, Button} from 'react-bootstrap/lib';
import {Link} from 'react-router-dom';

const RepoList = ({gitRepositories}) => {
    const publicList = gitRepositories.map( (repo) => {
        console.log('repo:   ',repo);
        return (
            <Col xs={6} md={4} key={repo.id}>
                <ListGroupItem bsStyle="info" className="repo-list-item">
                    <div>Name: {repo.name}</div>
                    <div>Language: {repo.language ? repo.language : 'No language'}</div>
                    <a href={repo.html_url} target="_blank">Link to {repo.name}</a>
                    <Row>
                        <Button>
                            <Link to='/releases'>View Releases</Link>
                        </Button>
                        <Button>
                            <Link to='/commits'>View Commits</Link>
                        </Button>
                    </Row>
                </ListGroupItem>
            </Col>
        )
    })

    // <Commits commitsUrl={repo.commits_url}  onClickShowModal="onClickShowModal"></Commits>
    // <Releases releasesUrl={repo.releases_url}  onClickShowModal="onClickShowModal"></Releases>

    return(
        <div>
            <Grid>
                <Row className="show-grid">
                    <ListGroup>
                        {publicList}
                    </ListGroup>
                </Row>
            </Grid>
        </div>
    )
}

export default RepoList;