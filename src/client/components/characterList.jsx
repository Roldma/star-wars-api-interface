import React, { Component } from 'react';
import axios from 'axios';

class CharList extends Component {
  constructor() {
    super();
    this.state = {
      chars: {},
      charInfo: {},
    };
  }

  componentDidMount() {
    this.getCharList();
  }

  async getCharList() {
    try {
      const response = await axios.get('http://localhost:6969/characters');
      this.setState(() => {
        const updatedCharObj = {};
        response.data.characters.forEach((char, ind) => {
          updatedCharObj[ind] = [char.name, char.url];
        });
        return { chars: updatedCharObj };
      });
      console.log(response);
    } catch (error) {
      return console.log(error);
    }
  }

  /*
  ** Need to Create get movie info functionality and onclick
  */
  async getMovieInfo() {
    try {
      if (Object.keys(this.state.chars).length > 0) {
        const response = await axios.get('');
      }
    } catch (err) {
      return console.log(err);
    }
  }

  render() {
    const { chars } = this.state;
    let key = 0;
    const charNames = Object.values(chars).map((char) => {
      key += 1;
      return <li key={`id${key}`}>{char[0]}</li>;
    });
    return (
      <div className="charlist">
        <ul>{charNames}</ul>
      </div>
    );
  }
}

export default CharList;
