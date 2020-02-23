import React, { Component } from 'react';
import RecommendPlace from '../Components/RecommendPlace'

class RecommendPage extends Component {

    render() {
        const dSpot= this.props.history.location.state.param;
        return (
            <RecommendPlace dSpot={dSpot}></RecommendPlace>
        );
    }
}

export default RecommendPage;