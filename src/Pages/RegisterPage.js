import React, { Component } from 'react';
import Register from '../Components/Register';

class RegisterPage extends Component {

    render() {
        return (
            <div>
                <div style={{ backgroundColor: "lightblue" }}>Decide Spot</div>
                <div> 
                    <Register />
                </div>
            </div>
        );
    }
}

export default RegisterPage;