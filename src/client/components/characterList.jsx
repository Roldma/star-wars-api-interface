import React, { Component } from 'react';
import axios from 'axios';
import MovieInfo from './movieInfo.jsx';

class CharList extends Component {
  constructor() {
    super();
    this.state = {
      selectedChar: null,
      selectedFilms: [],
      chars: {},
    };
    this.getCharInfo = this.getCharInfo.bind(this);
    this.getFilmInfo = this.getFilmInfo.bind(this);
  }

  componentDidMount() {
    this.getCharList();
  }

  async getCharList() {
    try {
      const response = await axios.get('http://localhost:6969/characters');
      this.setState(() => {
        const updatedCharObj = {};
        response.data.characters.forEach((char) => {
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
  async getCharInfo(url) {
    try {
      await axios
        .get(url)
        .then((response) => {
          this.setState((currState) => {
            const { chars, selectedFilms } = currState;
            if (chars[response.data.name]) {
              chars[response.data.name].info = response.data;

              currState.selectedChar = response.data.name;
            } else {
              chars[response.data.name] = {
                info: response.data,
              };
              currState.selectedChar = response.data.name;
            }

            return currState;
          });
          this.getFilmInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  async getFilmInfo() {
    try {
      console.log(this.state);
      const filmsArr = [];

      const { films } = this.state.chars[this.state.selectedChar].info;
      for (let i = 0; i < films.length; i += 1) {
        axios
          .get(films[i])
          .then((response) => {
            filmsArr.push(response.data.title);
          })
          .then(() => {
            this.setState((currState) => {
              currState.selectedFilms = filmsArr;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
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
          onClick={(e) => {
            this.getCharInfo(url.url);
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
