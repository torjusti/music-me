import React, { Component } from 'react';
import './SearchField.css';

export default class SearchField extends Component {
  state = {
    searchInput: '',
  };

  handleSearchInput = input => {
    this.setState({
      searchInput: input,
    });
    console.log('Searchinput state: ' + this.state.searchInput);
  };

  render() {
    return (
      <div>
        <input placeholder={'Søk ...'} onChange={this.handleSearchInput} />
      </div>
    );
  }
}
