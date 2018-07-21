import React from 'react';
import './Wrapper.css';
import {Grid, Row} from 'react-bootstrap';

const Wrapper = props => (

    <Grid>
        {/* <Col md={8} mdOffset={2}> */}
        <Row className="text-center">
        {props.children}
        </Row>
        {/* </Col> */}
    </Grid>
)

export default Wrapper;