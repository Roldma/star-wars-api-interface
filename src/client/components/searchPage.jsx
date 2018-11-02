import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './searchBar.jsx';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
      searchResults: {},
    };
    this.getResults = this.getResults.bind(this);
  }

  componentDidUpdate() {}

  /**
   *
   * @param {string} queryStr - string passed in from text input search bar used for making
   * request
   */
  async getResults(queryStr) {
    try {
      await this.setState({ searchString: queryStr });
      const { searchString } = this.state;
      const urlSearchString = `http://localhost:6969/api/search/${searchString}`;
      const searchResults = await axios.get(urlSearchString);
      this.setState({ searchString: '' });
      console.log(searchResults);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <SearchBar makeRequest={this.getResults} />
      </div>
    );
  }
}

export default SearchPage;
