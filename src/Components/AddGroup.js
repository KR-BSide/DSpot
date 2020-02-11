import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

class AddGroup extends Component{
    render(){
        return(
            <div>
                <div><h4>정기적으로 모이신다면!</h4></div>
                <div>그룹 등록으로 더욱 편리하게</div>
                <div>D-spot을 이용하세요 :) </div>
                <div>
                    <b>등록하기</b>
                    <IconButton color="primary" aria-label="add" href="/groupList">
                        <AddCircleOutlineRoundedIcon />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default AddGroup;