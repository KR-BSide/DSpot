import React, { Component } from 'react';
import GroupInfo from '../Components/GroupInfo';
import MemberList from '../Components/MemberList';
import GroupHistory from '../Components/GroupHistory';


class GroupInfoPage extends Component {

    render() {
        return (
            <div>
                <div style={{ backgroundColor: "lightblue" }}>Decide Spot</div>
                <div> 
                    <GroupInfo />
                </div>
                <div>
                    <MemberList />
                </div>
                <div>
                    <GroupHistory />
                </div>
            </div>
        );
    }
}

export default GroupInfoPage;