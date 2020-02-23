import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class GroupInfo extends Component{
    render(){
        return(
            <div>
                <div>
                    <form noValidate autoComplete="off">
                        <TextField 
                            id="standard-basic" 
                            placeholder="그룹명을 입력하세요"  
                            margin='normal' 
                            autoFocus="True"  
                        />
                    </form>
                </div>  
            </div>
        );
    }
}

export default GroupInfo;