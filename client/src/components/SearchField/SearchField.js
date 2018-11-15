import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Icon, Button } from 'semantic-ui-react';
import styles from './SearchField.module.css';
import { setQuery, clearQuery } from '../../features/search/actions';

export class SearchField extends Component {
  state = {
    // The search query.
    query: '',
  };

  /**
   * Listen for key presses, in order to treat enter key as a click.
   */
  handleKeyPress = event => {
    // If the enter key was pressed, treat it as a click.
    if (event.key === 'Enter') {
      this.handleClick();
    }
  };

  /**
   * Handle typing in the select box.
   */
  handleChange = event => {
    this.setState({
      query: event.target.value,
    });
  };

  /**
   * Handle clicks on the search button.
   */
  handleClick = () => {
    // If there is text in the field, we set the query text, causing
    // the table to update. If the query is empty, we send another
    // action, which causes the table to not be dependent on the
    // query any longer.
    if (this.state.query) {
      this.props.setQuery(this.state.query);
    } else {
      this.props.clearQuery();
    }
  };

  render() {
    return (
      <div className={styles.container} data-component="SearchField">
        <div className={styles.searchContainer}>
          <Input
            icon="search"
            value={this.state.query}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            className={styles.searchField}
          />
        </div>

        <div className={styles.searchButtonContainer}>
          <Button
            onClick={this.handleClick}
            style={{ marginRight: 0, width: '100%' }}
            classname={styles.searchButton}
          >
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
  mapDispatchToProps,
)(SearchField);
