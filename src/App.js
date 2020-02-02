import './App.css';

import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import { Movie } from './Components/Movie';
import { fire } from './Utils/Firebase';
import { SharingPage } from './Pages/SharingPage';

class App extends Component {
  constructor() {
    super();
    fire(); // 파이어베이스 실행
    this._initializeKakaoEnv();
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
          <Route exact path="/" component={Map} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
