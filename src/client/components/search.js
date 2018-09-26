import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = store => ({});
const mapDispatchToProps = dispatch => ({});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="searchContainer">
        <form>
          <input type="input" />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
