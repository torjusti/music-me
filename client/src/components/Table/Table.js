import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styles from './Table.module.css';

class Table extends Component {
  render() {
    const columns = ['Title', 'Artist', 'Album'].map(Header => ({
      Header,
      accessor: Header.toLowerCase(),
    }));

    return (
      <div className={styles.container}>
        <ReactTable data={this.props.data} columns={columns} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.songs,
});

export default connect(mapStateToProps)(Table);
