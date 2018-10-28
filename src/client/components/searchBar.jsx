import React, { Component } from 'react';
import axios from 'axios';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      finalStr: '',
    };
    this.textFill = this.textFill.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  textFill(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit(e) {
    const { inputValue } = this.state;
    this.setState({ finalStr: inputValue });
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="search_text_input" onChange={this.textFill} />
          <input type="submit" value="Pew pew" />
          <div />
        </form>
      </div>
    );
  }
}

export default SearchBar;
