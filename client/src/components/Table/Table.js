import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styles from './Table.module.css';

export default class Table extends Component {
  // FROM https://react-table.js.org/#/story/readme

  render() {
    const data = [
      {
        title: 'POP MY WORLD',
        artist: 'Tanner Linsley',
        album: 26,
        genre: 'pop',
      },
    ];

    const columns = [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: props => <span className="number">{props.value}</span>,
      },
      {
        Header: 'Artist',
        accessor: 'artist',
        Cell: props => <span className="number">{props.value}</span>,
      },
      {
        Header: 'Album',
        accessor: 'album',
        Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
      },
      {
        Header: 'Genre',
        accessor: 'genre',
        Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
      },
    ];

    return (
      <div className={styles.container}>
        <ReactTable data={data} columns={columns} />
      </div>
    );
  }
}
