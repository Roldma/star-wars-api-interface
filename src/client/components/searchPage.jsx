import React, { Component } from 'react';
import axios from '../../resources/axiosconf';

import SearchBar from './searchBar.jsx';
import RecentSearchListDisplay from './recentSearchListDisplay.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      recentSearchList: [],
      searchResults: {},
      currQuery: {
        input: '',
        category: '',
      },
    };

    this.recentSearchApi = 'api/recent-search-list';
    this.searchApi = 'api/search/';

    this.isCancelled = false;
    this.recentListUpdated = false;

    this.getSearchResults = this.getSearchResults.bind(this);
    this.getRecentSearch = this.getRecentSearch.bind(this);
    this.updateRecentSearch = this.updateRecentSearch.bind(this);
  }

  componentDidMount() {
    this.getRecentSearch();
  }

  componentDidUpdate() {
    if (this.recentListUpdated && !this.isCancelled) {
      this.getRecentSearch();
    }
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  /**
   * Make request to server/api, updates state with server response
   * @param {string} queryStr - String passed in from text input search bar
   * @param {string} category - String passed in from radio button selected
   */
  async getSearchResults(input, category) {
    try {
      const currQuery = {
        input,
        category,
      };
      await this.setState({ currQuery });

      const response = await axios.get(this.searchApi, {
        params: currQuery,
      });
      console.log('searchResuts response', response);
      const [results] = response.data.results;
      this.setState({ searchResults: results });
      console.log('search RESULT', this.state.searchResults);
    } catch (err) {
      return err;
    }
  }

  /**
   * Makes request to server for list of recent searches
   */
  async getRecentSearch() {
    try {
      const requestedList = await axios.get(this.recentSearchApi);
      const { data } = requestedList;

      this.setState((state) => {
        const { recentSearchList } = state;
        const updatedList = data.filter(char => !recentSearchList.includes(char));

        return { recentSearchList: recentSearchList.concat(updatedList) };
      });

      this.recentListUpdated = false;
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
      await this.setState({
        currQuery: {
          input: queryStr,
        },
      });

      await axios.post(this.recentSearchApi, {
        input: this.state.currQuery.input,
      });

      this.recentListUpdated = true;
    } catch (error) {
      return error;
    }
  }

  render() {
    const { recentSearchList } = this.state;
    const recentSearchComp = <RecentSearchListDisplay recentSearchList={recentSearchList} />;

    return (
      <div>
        <SearchBar
          getSearchResults={this.getSearchResults}
          getRecentSearch={this.getRecentSearch}
          updateRecentSearch={this.updateRecentSearch}
          recentSearchList={recentSearchList}
        />
        <p className="recent_search_list"> Recent Searches made </p>
        <ErrorBoundary>
          {recentSearchList.length ? recentSearchComp : 'No recent Searches'}
        </ErrorBoundary>
      </div>
    );
  }
}

export default SearchPage;
