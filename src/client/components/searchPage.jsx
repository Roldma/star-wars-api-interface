import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './searchBar.jsx';
import RecentSearchList from './recentSearchList.jsx';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      recentSearchList: [],
      searchString: '',
      searchCategory: '',
      searchResults: {},
    };
    this.getResults = this.getResults.bind(this);
    this.getRecentSearchList = this.getRecentSearchList.bind(this);
  }

  componentDidMount() {
    this.getRecentSearchList();
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
      const urlSearchString = `http://localhost:6868/api/search/?string=${searchString}&category=${searchCategory}`;
      const searchResults = await axios.get(urlSearchString);

      this.setState({ searchString: '' });
      console.log('search RESULT', searchResults);
    } catch (err) {
      throw err;
    }
  }

  async getRecentSearchList() {
    try {
      const recentSearchListURL = 'api/recent-search-list';
      const recentSearchList = await axios.get(`http://localhost:6868/${recentSearchListURL}`);
      console.log(typeof recentSearchList, 'TYPE OF recent search lsist from axios get to API');
      console.log(recentSearchList);

      this.setState(() => {
        const { data } = recentSearchList;
        return { recentSearchList: data };
      });

      console.log('*** STate recentsearchlist', this.state.recentSearchList);
    } catch (error) {
      throw error;
    }
  }

  render() {
    const { recentSearchList } = this.state;
    const recentSearch = <RecentSearchList searchList={recentSearchList} />;

    return (
      <div>
        <SearchBar makeRequest={this.getResults} />
        <p className="recent_search_list"> Recent Searches made </p>
        {recentSearchList.length ? recentSearch : 'NONE'}
      </div>
    );
  }
}

export default SearchPage;
