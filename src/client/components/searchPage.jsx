import React, { Component } from 'react';

import SearchBar from './searchBar.jsx';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
    };
    this.tests = this.tests.bind(this);
  }

  async getResults(queryStr) {
    try {
      this.setState({ searchString: queryStr });
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
