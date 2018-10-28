import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './searchBar.jsx';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
    };
    this.getResults = this.getResults.bind(this);
  }

  async getResults(queryStr) {
    try {
      this.setState({ searchString: queryStr });
      const urlSearchString = 'http://localhost:6969/search';
      const searchResults = await axios.get(urlSearchString, {
        params: {
          category: queryStr,
        },
      });
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
