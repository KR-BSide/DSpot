import React, { Component } from 'react';

class RegisterGroup extends Component{
    render(){
        return(
            <div>
                <div style={{ backgroundColor: "red" }}>Decide Spot</div>
                <div>
                    <button>등록하기</button>
                </div>
                <div>Group Name</div>
                <div>
                    <RegisterMember />
                </div>
            </div>
        );
    }
}

export default RegisterGroup;