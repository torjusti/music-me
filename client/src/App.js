import React from 'react';
import Header from './components/Header';
import Table from './components/Table/DataTable';
import SearchField from './components/SearchField/SearchField';
import SidePanel from './components/SidePanel/SidePanel';
import DataLoader from './components/DataLoader';
import styles from './App.module.css';

const App = () => (
  <div>
    <Header />
    <main className={styles.main}>
      <DataLoader />

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

export default App;
