import React, { Component } from 'react';

import authentication from '../Utils/authentication';

class FirstPage extends Component {
    
    constructor(){
        super();
        this.googlelogin = this.googlelogin.bind(this);
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
                <div style={{ backgroundColor: "red" }}>Decide Spot</div>
                <div>
                    어디서 모일지 고민보다
                    어떻게 만들지 고민하세요!

                    <h2>모임 장소는 D-spot이 찾아드릴께요 :) </h2>

                    <button onClick={this.googlelogin}>Google로 시작하기</button>
                </div>
            </div>
        );
    }
}

export default FirstPage;