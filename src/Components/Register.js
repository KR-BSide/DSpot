import React, { Component } from 'react';
import Button from '@material-ui/core/Button/Button';

class Register extends Component{
    render(){
        return(
            <div>
                <div>
                    <h4>정기적으로 모이시나요?</h4>
                </div>
                <div>
                    <Button variant="outlined" color="primary" href="/addGroup">네, 그룹 등록 할래요</Button>
                </div>
                <div>
                    <Button variant="outlined" color="primary" href="/oneTimeMeeting">아니요, 한번만 모여요</Button>
                </div>
                <div>
                    <Button variant="outlined" color="primary" href="/groupList">이미 등록한 그룹이 있어요</Button>
                </div>
                
            </div>
        );
    }
}

export default Register;