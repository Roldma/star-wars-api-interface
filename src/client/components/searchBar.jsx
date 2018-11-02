import React, { Component } from 'react';
import axios from 'axios';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
    this.textFill = this.textFill.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  textFill(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit(e) {
    const { inputValue } = this.state;
    const { makeRequest } = this.props;
    makeRequest(inputValue);
    this.setState({ inputValue: '' });
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="inputBars"
            type="text"
            id="search_text_input"
            onChange={this.textFill}
            value={this.state.inputValue}
          />
          <div />
        </form>
      </div>
    );
  }
}

export default SearchBar;
