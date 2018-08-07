import React from 'react';
import { Grid, Row } from 'react-bootstrap/lib';

const RepoResources = ({gitReleases}) => {
    const releaseList = gitReleases.map( (release) => {
        return(
            <div>{release}</div>
        )
    });

    return(
        <div>
            <Grid>
                <Row className="show-grid">
                    RELEASES
                </Row>
            </Grid>
        </div>
    )
}

export default RepoResources;
