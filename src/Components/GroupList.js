import React, { Component } from 'react';
import AddGroup from '../Components/AddGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const databaseURL = "https://fbtest-a01ed.firebaseio.com/";


const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    },
});

class GroupList extends Component{

    constructor(){
        super();
        this.state={
            groups:{},
            expanded:false,
            setExpanded:false, 
        };
    }

    handleExpandClick = () => {
        //this.setExpanded(!this.expanded);
      };

    _get(){
        fetch(`${databaseURL}/groups.json`).then(res => {
            if(res.status != 200) {
            throw new Error(res.statusText);
            }
            return res.json();
            }).then(groups => this.setState({groups: groups}));
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextState.groups != this.state.groups
    }

    componentDidMount(){
        this._get();
    }

    render(){
        return(
            <div>
                <div><AddGroup /></div>
                <div>
                    {Object.keys(this.state.groups).map(id => {
                        const group = this.state.groups[id];
                        return (
                            <div key={id}>
                                <Card variant="outlined"> 
                                    <CardContent> 
                                        <CardActions disableSpacing>
                                            <Typography component="h2">
                                                {group.groupName}
                                            </Typography>
                                            <IconButton
                                                onClick={this.handleExpandClick}
                                                aria-label="show more"
                                            >
                                            <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>
                                    </CardContent>
                                </Card>
                                <br />
                            </div>
                        );
                    })}
                </div>    
            </div>
        );
    }
}

export default withStyles(styles)(GroupList);
