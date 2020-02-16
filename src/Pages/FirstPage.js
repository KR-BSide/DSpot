import React, { Component } from 'react';
import Button from '@material-ui/core/Button/Button';
import authentication from '../Utils/authentication';
import Intro from '../Components/Intro';

class FirstPage extends Component {
    
    constructor(){
        super();
        //this.googlelogin = this.googlelogin.bind(this);
    }
    
    
    googlelogin(){
        authentication.signInWithPopup()
        .then(value => console.log(value))
        console.log("google Log-in!!!!")     
    }

    state = {

    }

    render() {
        return (
            <div>
                <Intro />
                <Button variant="outlined" color="primary" href="/registerGroup" onClick={this.googlelogin}>Google로 시작하기</Button>
            </div>
        );
    }
}

export default FirstPage;