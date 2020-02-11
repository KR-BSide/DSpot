import React, { Component } from 'react';
import GroupList from '../Components/GroupList';


class GroupListPage extends Component {

    render() {
        return (
            <div>
                <div style={{ backgroundColor: "lightblue" }}>Decide Spot</div>
                <div> 
                    <GroupList />
                </div>
            </div>
        );
    }
}

export default GroupListPage;