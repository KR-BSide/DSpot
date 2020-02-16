import React, { Component } from 'react';
import RegisterGroup from '../Components/RegisterGroup';


class RegisterGroupPage extends Component {

    render() {
        return (
            <div>
                <div style={{ backgroundColor: "lightblue" }}>Decide Spot</div>
                <div> 
                    <RegisterGroup />
                </div>
            </div>
        );
    }
}

export default RegisterGroupPage;