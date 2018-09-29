import React, { Component } from 'react';
import axios from 'axios';

class CharList extends Component {
  constructor() {
    super();
    this.state = {
      chars: [],
    };
  }

  componentDidMount() {
    this.CharList();
  }

  async CharList() {
    try {
      const response = await axios.get('http://localhost:6969/characters');
      this.setState(() => {
        const charArr = response.data.characters.map(char => char.name);
        return { chars: charArr };
      });
      console.log(response);
    } catch (error) {
      return console.log(error);
    }
  }

  render() {
    const { chars } = this.state;
    const charsToDisplay = chars.map((char, ind) => <li key={`char+${ind}`}>{char}</li>);
    return (
      <div className="charlist">
        <ul>{charsToDisplay}</ul>
      </div>
    );
  }
}

export default CharList;
