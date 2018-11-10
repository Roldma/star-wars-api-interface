import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './searchBar.jsx';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
      searchResults: {},
      searchCategory: '',
    };
    this.getResults = this.getResults.bind(this);
  }

  componentDidUpdate() {}

  /**
   *
   * @param {string} queryStr - String passed in from text input search bar to make request
   *
   */
  async getResults(queryStr, category) {
    try {
      await this.setState({ searchString: queryStr, searchCategory: category });

      const { searchString, searchCategory } = this.state;
      const urlSearchString = `http://localhost:6969/api/search/${searchCategory}/${searchString}`;
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
