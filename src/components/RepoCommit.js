import React from 'react';
import { Row, Grid } from 'react-bootstrap/lib';

const RepoCommit = ({gitCommits}) => {
    const commitList = gitCommits.map( (commit) => {
        console.log('commit:   ',commit);

        return(
            <div>{commit}</div>
        )
    });

    return(
        <div>
            <Grid>
                <Row className="show-grid">
                    COMMITS
                </Row>
            </Grid>
        </div>
    )
}

export default RepoCommit;
