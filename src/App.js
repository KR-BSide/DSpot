import './css/App.css';

import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './Utils/Firebase';
//import authentication from './Utils/authentication';

import SharingPage from './Pages/SharingPage';
import MapPage from './Pages/MapPage';
import RegisterMemberPage from './Pages/RegisterMemberPage';
import FirstPage from './Pages/FirstPage';
import RegisterGroupPage from './Pages/RegisterGroupPage'
import OneTimeMeetingPage from './Pages/OneTimeMeetingPage';
import GroupListPage from './Pages/GroupListPage';
import AddGroupPage from './Pages/AddGroupPage';


class App extends Component {
  constructor() {
    super();
    this._initializeKakaoEnv();
    //authentication.signInWithPopup()
    //.then(value => console.log(value));
  }

  state = {
  }

  _initializeKakaoEnv() {
    window.Kakao.init('65043e1c13a4590368f0053d44c9940e');
  }

  componentDidMount() {
    //this._getMovies();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={FirstPage} />
          <Route exact path="/registerGroup" component={RegisterGroupPage}/>
          <Route exact path="/addGroup" component={AddGroupPage}/>
          <Route exact path="/groupList" component={GroupListPage}/>
          <Route exact path="/registerMember" component={RegisterMemberPage} />
          <Route exact path="/oneTimeMeeting" component={OneTimeMeetingPage} />
          <Route exact path="/map" component={MapPage} />
          <Route exact path="/sharing" component={SharingPage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
