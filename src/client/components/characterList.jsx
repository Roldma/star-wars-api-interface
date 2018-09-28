import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = store => ({});
const mapDispatchToProps = dispatch => ({});

class CharList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="charlist">
        <ul>
          <li>item1</li>
          <li>item2</li>
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CharList);
