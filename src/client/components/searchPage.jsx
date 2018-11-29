import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './searchBar.jsx';
import RecentSearchListDisplay from './recentSearchListDisplay.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

class SearchPage extends Component {
  constructor(props) {
    super();
    this.localHost = props.localhost;
    this.recentSearchUrl = 'api/recent-search-list';
    this.state = {
      recentSearchList: [],
      searchResults: {},
    };
    this.getResults = this.getResults.bind(this);
    this.getRecentSearch = this.getRecentSearch.bind(this);
    this.updateRecentSearch = this.updateRecentSearch.bind(this);
  }

  componentDidMount() {
    this.getRecentSearch();
  }

  componentDidUpdate() {}

  /**
   * Function to make request to server/api, updates state with server response
   * @param {string} queryStr - String passed in from text input search bar
   * @param {string} category - String passed in from radio button selected
   */
  async getResults(queryStr, category) {
    try {
      const searchApi = 'api/search/';

      const urlSearchString = `${
        this.localHost
      }${searchApi}?category=${category}&querystr=${queryStr}`;

      const searchResults = await axios.get(urlSearchString);

      console.log('search RESULT', searchResults);
    } catch (err) {
      return err;
    }
  }

  /**
   * Makes request to server for list of recent searches
   */
  async getRecentSearch() {
    try {
      const url = `${this.localHost}${this.recentSearchUrl}`;
      const requestedList = await axios.get(url);

      const { data } = requestedList;
      await this.setState({ recentSearchList: data });
    } catch (error) {
      return error;
    }
  }

  /**
   * Makes post request to update recent search list, and get request for new recent search list
   * @param {string} queryStr - user input string from search bar
   */
  async updateRecentSearch(queryStr) {
    try {
      await axios({
        method: 'post',
        url: `${this.localHost}${this.recentSearchUrl}`,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: { queryStr },
      });

      const updatedRecent = axios.get(`${this.localHost}${this.recentSearchUrl}`);

      return this.setState({ recentSearchList: updatedRecent });
    } catch (error) {
      return error;
    }
  }

  render() {
    const { recentSearchList } = this.state;
    const recentSearch = <RecentSearchListDisplay recentSearchList={recentSearchList} />;

    return (
      <div>
        <SearchBar
          getResults={this.getResults}
          getRecentSearch={this.getRecentSearch}
          updateRecentSearch={this.updateRecentSearch}
          recentSearchList={recentSearchList}
        />
        <p className="recent_search_list"> Recent Searches made </p>
        <ErrorBoundary>{recentSearch}</ErrorBoundary>
      </div>
    );
  }
}

export default SearchPage;
