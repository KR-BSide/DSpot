import React, { Component } from 'react';
import Button from '@material-ui/core/Button/Button';
import RegisterMember from '../Components/RegisterMember';

class RegisterMemberPage extends Component {

    render() {
        return (
            <div>
                <div style={{ backgroundColor: "lightblue" }}>Decide Spot</div>
                <div>
                    <RegisterMember />
                </div>
            </div>
        );
    }
}

export default RegisterMemberPage;