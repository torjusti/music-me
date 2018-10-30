import React, { Component } from 'react';
import styles from './SearchField.module.css';
import { Input, Icon, Button } from 'semantic-ui-react';

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
        <Input
          icon="search"
          placeholder="Search ..."
          className={styles.searchField}
        />
        <Button
          onClick={this.handleChange}>
          Search
          <Icon name="angle right"/>
        </Button>
      </div>
    );
  }
}
