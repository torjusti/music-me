import React, { Component } from 'react';
import './SearchField.css';

export default class SearchField extends Component {
  state = {
    searchValue: '',
  };

  handleChange = input => {
    this.setState({
      searchValue: input,
    });
  };

  render() {
    return (
      <div>
        <input placeholder="Søk ..." onChange={this.handleChange} />
      </div>
    );
  }
}
