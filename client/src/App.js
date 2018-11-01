import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import Table from './components/Table/DataTable';
import SearchField from './components/SearchField/SearchField';
import SidePanel from './components/SidePanel/SidePanel';
import styles from './App.module.css';

class App extends Component {
  componentDidMount() {
    // Initial loading of first page of songs.
    this.props.dispatch({ type: 'FETCH_SONGS' });
  }

  render() {
    return (
      <div>
        <Header />

        <main className={styles.main}>
          <div>
            <h1>Search in our music database</h1>
            <SearchField />
          </div>

          <div className={styles.content}>
            <Table />
            <SidePanel />
          </div>
        </main>
      </div>
    );
  }
}

export default connect()(App);
