import './css/App.css';

import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './Utils/Firebase';
import authentication from './Utils/authentication';

import SharingPage from './Pages/SharingPage';
import MapPage from './Pages/MapPage';
import RecommendPage from './Pages/RecommendPage';
class App extends Component {
  constructor() {
    super();
    // this._initializeKakaoEnv();
    authentication.signInWithPopup()
    .then(value => console.log(value));
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
          <Route exact path="/" component={MapPage} />
          <Route exact path="/sharing" component={SharingPage} />
          <Route exact path="/recommend" component={RecommendPage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
