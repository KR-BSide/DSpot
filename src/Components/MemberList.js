import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutline'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class MemberList extends Component{
    
    state={
        name: '',
        open: false,
    }
    handleChange =(e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    
    handleClickOpen = () => {
        this.setState({ open  : true});
        console.log("handleClick open")
        console.log(this.state.open)
    }

    handleClose = () => {
        this.setState({open:false});
    }
    
    render(){
        const {open} = this.state;
        return(
            <div> 
                <div><h4>멤버리스트</h4></div>
                <div>
                    이름,  출발지
                </div>
                <div>
                    <TextField id="memberlist-name" label="Name" variant="outlined" 
                        value={this.state.name}
                        onChange={this.handleChange}
                        name="name"/>
                    <TextField id="memberlist-departure" label="departure" variant="outlined" onClick={this.handleClickOpen}/>
                    

                    <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">출발지</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            출발지를 입력하세요!!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="departure"
                            type="text"
                            fullWidth
                        />
                        </DialogContent>
                        <DialogActions>
                         
                        <Button onClick={this.handleClose} color="primary">
                            Search
                        </Button>
                        </DialogActions>
                    </Dialog>
                                    
                    <IconButton color="primary" aria-label="add">
                        <AddCircleOutlineRoundedIcon onClick={this.add_inputfield}/>
                    </IconButton>
                </div>
                <IconButton color="primary" aria-label="add">
                    <RemoveCircleOutlineIcon />
                </IconButton>
                <div>{this.state.name}</div>
            </div>
            
        );
    }
}

export default MemberList;