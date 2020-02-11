import React, { Component } from 'react';
import AddGroup from '../Components/AddGroup';


class AddGroupPage extends Component {

    render() {
        return (
            <div>
                <div style={{ backgroundColor: "lightblue" }}>Decide Spot</div>
                <div> 
                    <AddGroup />
                </div>
            </div>
        );
    }
}

export default AddGroupPage;