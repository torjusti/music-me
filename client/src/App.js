import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './components/Table/Table';
import SearchField from './components/SearchField/SearchField';
import SidePanel from './components/SidePanel/SidePanel';
import Pagination from './components/Pagination';
import styles from './App.module.css';

class App extends Component {
  componentDidMount() {
    // Initial loading of first page of songs.
    this.props.dispatch({ type: 'FETCH_SONGS' });
  }

  render() {
    return (
      <div className={styles.app}>
        <div>
          <h1>Søk gjennom musikklistene våre</h1>
          <SearchField />
        </div>

        <div className={styles.subCont}>
          <Table />
          <SidePanel />
        </div>

        <Pagination />
      </div>
    );
  }
}

export default connect()(App);
