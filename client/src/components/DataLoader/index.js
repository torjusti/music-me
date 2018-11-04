import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorMessage from './ErrorMessage';

class DataLoader extends Component {
  loadData = () => {
    this.props.dispatch({ type: 'FETCH_SONGS' });
  };

  componentDidMount() {
    // Initial loading of first page of songs.
    this.loadData();
  }

  render() {
    if (this.props.error) {
      return <ErrorMessage onClick={this.loadData} />;
    }

    return null;
  }
}

const mapStateToProps = state => ({
  error: state.loadingError,
});

export default connect(mapStateToProps)(DataLoader);
