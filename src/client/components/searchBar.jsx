import React, { Component } from 'react';

class searchBar extends Component {
  constructor(props) {
    super();
    this.state = {
      inputValue: '',
      finalStr: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {}
}

export default searchBar;
