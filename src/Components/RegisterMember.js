import React, { Component } from 'react';
import GroupHistory from './GroupHistory';
import GroupInfo from './GroupInfo';
import MemberList from './MemberList';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

class RegisterMember extends Component{
    render(){
        return(
            <div>
                <div><GroupInfo /></div>
                <div>
                    <MemberList />
                </div>
                <div><IconButton color="primary" aria-label="add">
                        <AddCircleOutlineRoundedIcon />
                    </IconButton>
                </div>
                <div><GroupHistory /></div>
            </div>
        );
        
        
    }
}

export default RegisterMember;