import React, { Component } from 'react';

class RecommendPlace extends Component {


    componentDidMount() {
        alert("장소 추천 페이지지롱");
        console.log(this.props.dSpot);
    }

    render() {
        return (
            <div>
            </div>
        )
    };
}


export default RecommendPlace;