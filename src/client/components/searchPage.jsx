import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './searchBar.jsx';
import RecentSearch from './recentSearch.jsx';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      recentSearches: null,
      searchString: '',
      searchCategory: '',
      searchResults: {},
    };
    this.getResults = this.getResults.bind(this);
    this.getRecentSearch = this.getRecentSearch.bind(this);
  }

  componentDidUpdate() {}

  /**
   *
   * @param {string} queryStr - String passed in from text input search bar
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
      throw err;
    }
  }

  async getRecentSearch() {
    try {
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div>
        <SearchBar makeRequest={this.getResults} />
        <RecentSearch />
      </div>
    );
  }
}

export default SearchPage;
