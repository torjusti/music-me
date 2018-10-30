import React, { Component } from 'react';
import styles from './SearchField.module.css';

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
        <input
          placeholder="Søk ..."
          className={styles.searchField}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
