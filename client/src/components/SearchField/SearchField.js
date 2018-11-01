import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Icon, Button } from 'semantic-ui-react';
import styles from './SearchField.module.css';
import { setQuery, clearQuery } from '../../features/search/actions';

class SearchField extends Component {
  state = {
    query: '',
  };

  handleKeyPress = event => {
    // If the enter key was pressed, treat it as a click.
    if (event.key === 'Enter') {
      this.handleClick();
    }
  };

  handleChange = event => {
    this.setState({
      query: event.target.value,
    });
  };

  handleClick = () => {
    if (this.state.query) {
      this.props.setQuery(this.state.query);
    } else {
      this.props.clearQuery();
    }
  };

  render() {
    return (
      <div className='searchField'>
        <Input
          icon="search"
          placeholder="Type a value to search for"
          value={this.state.query}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          className={styles.searchField}
        />

        <div className={styles.searchButton}>
          <Button onClick={this.handleClick}>
            Search
            <Icon name="angle right" />
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setQuery,
  clearQuery,
};

export default connect(
  undefined,
  mapDispatchToProps
)(SearchField);
