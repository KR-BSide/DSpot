import React, { Component } from 'react';
import MemberList from '../Components/MemberList';


class OneTimeMeetingPage extends Component {

    render() {
        return (
            <div>
                <div style={{ backgroundColor: "lightblue" }}>Decide Spot</div>
                <div> 
                    <MemberList />
                </div>
            </div>
        );
    }
}

export default OneTimeMeetingPage;