import React, { Component } from 'react';
import AddMember from '../Components/AddMember';

const databaseURL = "https://fbtest-a01ed.firebaseio.com/";

class MemberList extends Component{
    
    constructor(){
        super();
        this.state = {
            words: {}
        }
    }

    state={
        name: '',
        open: false,
    }

    _get(){
        fetch(`${databaseURL}/words.json`).then(res => {
            console.log("_get()함수");
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(words => this.setState({words:words}));
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
    
    shouldComponentUpdate(nextProps, nextState){
        return nextState.words != this.state.words;
    }

    componentDidMount(){
        this._get();
    }

    render(){
        return(
            <div> 
                <div><h4>멤버리스트</h4></div>
                <div>
                    이름,  출발지
                </div>
                <div>
                    <AddMember />    
                </div> 
            </div>
            
        );
    }
}

export default MemberList;