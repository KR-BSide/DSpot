import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

class MemberList extends Component{
    render(){
        return(
            <div> 
                <div><h4>멤버리스트</h4></div>
                <div>
                    크롱, 강남역, 
                    <IconButton color="primary" aria-label="add">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </div>
                <div>
                    뽀로로, 서울역
                    <IconButton color="primary" aria-label="add">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </div>
                <div>
                    에디, 역삼역
                    <IconButton color="primary" aria-label="add">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </div>  
            </div>
        );
    }
}

export default MemberList;