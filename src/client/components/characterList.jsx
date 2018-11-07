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
      isError: false,
    };
    this.isCancelled = false;
    this.getCharInfo = this.getCharInfo.bind(this);
    this.getFilmInfo = this.getFilmInfo.bind(this);
  }

  componentDidMount() {
    this.getInitialCharList();
  }

  /**
   * If user clicks back while async request is in progress, this will prevent state update
   */
  componentWillUnmount() {
    this.isCancelled = true;
  }

  /**
   * Get Initial character list
   * */
  async getInitialCharList() {
    try {
      const charUrl = 'http://localhost:6969/characters';
      const response = await axios.get(charUrl);
      this.setState(() => {
        const updatedCharObj = {};
        response.data.characters.forEach((char) => {
          const { url } = char;
          updatedCharObj[char.name] = { url };
        });
        return { chars: updatedCharObj };
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {string} url - used for making request
   * Invoked when person clicks a character, triggers state update, then triggers react lifecyle
   * component did update.
   */
  async getCharInfo(url) {
    try {
      const charResults = await axios.get(url);
      console.log(charResults);
      if (!this.isCancelled) {
        this.setState((currState) => {
          const stateCopy = currState;
          const { chars } = stateCopy;
          const { data } = charResults;

          const validInfoObj = {};
          Object.entries(data).forEach(([key, val]) => {
            if (!/[^A-z0-9]/.test(val) && !Array.isArray(val)) {
              validInfoObj[key] = val;
            }
          });

          if (chars[data.name]) {
            chars[data.name].info = validInfoObj;
            chars[data.name].info.films = data.films;
            stateCopy.selectedChar = data.name;
          } else {
            chars[data.name] = { info: validInfoObj };
            stateCopy.selectedChar = charResults.data.name;
          }

          return { ...stateCopy, isError: false };
        });
        this.getFilmInfo();
      }
    } catch (err) {
      return this.setState({ isError: true });
    }
  }

  async getFilmInfo() {
    try {
      const { chars, selectedChar } = this.state;
      const { films } = chars[selectedChar].info;

      const filmsPromises = films.map(async (url) => {
        const response = await axios.get(url);
        return {
          title: response.data.title,
          date: new Date(response.data.release_date).toDateString(),
        };
      });

      const selectedFilms = await Promise.all(filmsPromises);

      if (!this.isCancelled) {
        await this.setState(currState => ({ ...currState, selectedFilms }));
      }
    } catch (error) {
      console.log(error);
      return this.setState({ isError: true });
    }
  }

  render() {
    const {
      chars, selectedChar, selectedFilms, isError,
    } = this.state;

    const filler = () => {
      if (isError) {
        return (
          <div>
            There was an error obtaining information for this character
            <img src="/img/404/star-wars404.jpg" alt="Character information Not found" />
          </div>
        );
      }
      return <div>No Character Selected</div>;
    };

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

    const MovieInfoComp = (
      <div>
        <MovieInfo state={this.state} />
      </div>
    );

    return (
      <div>
        <div className="charlist">
          <div>{charNames}</div>
        </div>

        <hr />

        <div className="click_results">
          {!isError && selectedChar && selectedFilms.length > 0 ? MovieInfoComp : filler()}
        </div>
      </div>
    );
  }
}

export default CharList;
