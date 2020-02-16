import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddGroup from '../Components/AddGroup';


class MemberList extends Component{
    render(){
        return(
            <div> 
                <div>
                    <AddGroup />
                </div>

                <div>
                    그룹1 
                    <IconButton color="primary" aria-label="add">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </div>
                <div>
                    그룹2
                    <IconButton color="primary" aria-label="add">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </div>
                <div>
                    그룹3
                    <IconButton color="primary" aria-label="add">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </div>  
            </div>
        );
    }
}

export default MemberList;