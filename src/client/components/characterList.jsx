import React, { Component } from 'react';
import axios from 'axios';
import MovieInfo from './movieInfo.jsx';

class CharList extends Component {
  constructor() {
    super();
    this.state = {
      selectedChar: null,
      selectedFilms: [],
      chars: {}
    };
    this.getMovieInfo = this.getMovieInfo.bind(this);
  }

  componentDidMount() {
    this.getCharList();
  }

  async getCharList() {
    try {
      const response = await axios.get('http://localhost:6969/characters');
      this.setState(() => {
        const updatedCharObj = {};
        response.data.characters.forEach(char => {
          const { url } = char;
          updatedCharObj[char.name] = { url };
        });
        return { chars: updatedCharObj };
      });
    } catch (error) {
      return console.log(error);
    }
  }

  /*
  ** Need to Create get movie info functionality and onclick and test out getMovieINfo middleware
  */
  async getMovieInfo(url) {
    try {
      console.log(this.state);
      const results = await axios.get(url);
      const films = [];

      for (let i = 0; i < results.data.films.length; i++) {
        axios
          .get(results.data.films[i])
          .then(function(response) {
            films.push(response.data.title);
          })
          .then(() => {
            this.setState(currState => {
              // console.log(response);
              // console.log('This.State: ', this.state);
              if (currState.chars[results.data.name]) {
                currState.chars[results.data.name].info = results.data;
                currState.selectedFilms = films;
                currState.selectedChar = results.data.name;
              } else {
                currState.chars[results.data.name] = {
                  info: results.data
                };
                currState.selectedFilms = films;
                currState.selectedChar = results.data.name;
              }

              return currState;
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log(this.state);
    const { chars, selectedChar, selectedFilms } = this.state;
    let key = 0;
    const charNames = Object.entries(chars).map(([char, url]) => {
      key += 1;
      return (
        <div
          key={`id${key}`}
          onClick={e => {
            this.getMovieInfo(url.url);
          }}
        >
          {char}
        </div>
      );
    });

    return (
      <div className="charlist">
        {charNames}
        {selectedChar && selectedFilms.length > 0 ? (
          <MovieInfo state={this.state} />
        ) : (
          <div>Dance Dance Dance</div>
        )}
      </div>
    );
  }
}

export default CharList;
