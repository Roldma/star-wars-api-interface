import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = store => ({});
const mapDispatchToProps = dispatch => ({});

const CharList = () => (
  <div className="charlist">
    <ul>
      <li>item1</li>
      <li>item2</li>
    </ul>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CharList);
