import React from 'react';
import { Row, Grid, Col, ListGroupItem, ListGroup, Media, } from 'react-bootstrap/lib';
import defaultAvatar from '../assets/pikachu_avatar.png';

const RepoCommit = ({gitCommits}) => {
    const commitList = gitCommits.map( (item) => {
        console.log('commit:   ',item);
        if( !item.commit && !item.committer ) {
          return false;
        }

        return(
          <Col xs={6} md={12} key={item.sha}>
              <ListGroupItem bsStyle="info" className="repo-list-item">
                <Media>
                    <Media.Left align="top">
                      {(item.committer && item.committer.avatar_url)
                        ?
                        <img width={64} height={64} src={item.committer.avatar_url}  alt="thumbnail" />
                        :
                        <img width={64} height={64} src={defaultAvatar}  alt={defaultAvatar} />
                       }
                    </Media.Left>
                    <Media.Body>
                      <Media.Heading>Name: {item.commit.committer.name}</Media.Heading>
                      <p>Commit message: {item.commit.message}</p>
                      <p>Date of commit: {item.commit.committer.date}</p>
                    </Media.Body>
                  </Media>
              </ListGroupItem>
          </Col>
        )
    });

    return(
      <div className="repo-commits">
          <Grid>
              <Row className="show-grid">
                  <ListGroup>
                      {commitList}
                  </ListGroup>
              </Row>
          </Grid>
      </div>
    )
}

export default RepoCommit;
