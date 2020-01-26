import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
import Map from './Map';
import { fire } from './Firebase';
import { Route, BrowserRouter } from 'react-router-dom';



class App extends Component {
  constructor() {
    super();
    fire(); // 파이어베이스 실행
  }

  state = {
   
  }

  componentDidMount() {
    //this._getMovies();
  }

  
  _renderMovies = () => {
    const movies = this.state.movies.map(movie=> {
      return <Movie 
      title={movie.title_english} 
      poster ={movie.medium_cover_image} 
      key={movie.id} 
      genres={movie.genres}
      synopsis={movie.synopsis} />
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch("https://yts.lt/api/v2/list_movies.json?sort_by=rating")
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err));
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
