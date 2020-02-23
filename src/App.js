import './css/App.css';

import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './Utils/Firebase';

import SharingPage from './Pages/SharingPage';
import MapPage from './Pages/MapPage';
import RegisterMemberPage from './Pages/RegisterMemberPage';
import FirstPage from './Pages/FirstPage';
import RegisterPage from './Pages/RegisterPage'
import OneTimeMeetingPage from './Pages/OneTimeMeetingPage';
import GroupListPage from './Pages/GroupListPage';
import AddGroupPage from './Pages/AddGroupPage';

import authentication from './Utils/authentication';

import firebase from './Utils/Firebase';


const styles = theme => ({
  root: {
    flexGrow: 1,
    color: 'white',
    width: '100%',
    height: '100%',
  },
  
  paper: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.primary.main,
  },
  center: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    width: '100%',
  },
  manduroBox: {
    
    height: '500px',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
  centerText: {
    position: 'absolute',
    bottom: '42%',
    right: '50%',
    transform: 'translate(50%, 50%)',
    width: '300px',
  },
  centerButton: {
    position: 'absolute',
    bottom: '40%',
    right: '50%',
    transform: 'translate(50%, 50%)',
    padding: '5px 10px',
  },
  centerProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  titleMargin: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  colorGrey: {
    color: theme.palette.grey[700],
    backgroundColor: 'transparent',
  },
  list: {
    color: theme.palette.grey[700],
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.main,
  },
  chip: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
    maxWidth: '200px',
    overflow: 'hidden',
  },
  button: {
    width: '100%',
    position: 'fixed',
    bottom: '0px',
    fontSize: '20px',
  },
  emptyButton: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
});

class App extends Component {
  constructor() {
    super();
    authentication.signInWithPopup()
    .then(value => console.log(value));
    //.catch(e=> console.log(e));
    this._initializeKakaoEnv();
  }

  state = {
  }

  _initializeKakaoEnv() {
    window.Kakao.init('65043e1c13a4590368f0053d44c9940e');
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({});
    }
    //firebase.initializeApp();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={FirstPage} />
          <Route exact path="/register" component={RegisterPage}/>
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


