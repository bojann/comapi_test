import React from 'react';
import {Col, Grid, Row, ListGroup, ListGroupItem, Button} from 'react-bootstrap/lib';
import {Link} from 'react-router-dom';

const RepoList = ({gitRepositories, onClickHandlePathname}) => {
    const publicList = gitRepositories.map( (repo) => {
        console.log('repo:   ',repo);

        let releaselink = `/releases?${repo.name}`
        let commitslink = `/commits?${repo.name}`
        let gitCommitsPath = `${repo.name}/commits`;
        let gitReleaselink = `${repo.name}/releases`;

        if( repo.name.length > 20) {
            repo.name = `${repo.name.substring(0,23)}...`;
        }

        return (
            <Col xs={6} md={4} key={repo.id}>
                <ListGroupItem bsStyle="info" className="repo-list-item">
                    <div>Name: {repo.name}</div>
                    <div>Language: {repo.language ? repo.language : <span className="red-color">'No language'</span>}</div>
                    <a href={repo.html_url} target="_blank">Link to {repo.name}</a>
                    <Row>
                        <Button>
                            <Link to={releaselink} data-gitpathname={gitReleaselink} onClick={onClickHandlePathname}>View Releases</Link>
                        </Button>
                        <Button>
                            <Link to={commitslink} data-gitpathname={gitCommitsPath} onClick={onClickHandlePathname}>View Commits</Link>
                        </Button>
                    </Row>
                </ListGroupItem>
            </Col>
        )
    })

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
