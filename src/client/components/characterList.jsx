import React, { Component } from 'react';
import axios from 'axios';

class CharList extends Component {
  constructor() {
    super();
    this.state = {
      chars: {},
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
  async getMovieInfo(url) {
    try {
      console.log(url);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { chars } = this.state;
    let key = 0;
    const charNames = Object.entries(chars).map(([char, url]) => {
      key += 1;
      return (
        <div
          key={`id${key}`}
          onClick={(e) => {
            this.getMovieInfo(url.url);
          }}
          value={url.url}
        >
          {char}
        </div>
      );
    });

    return <div className="charlist">{charNames}</div>;
  }
}

export default CharList;
