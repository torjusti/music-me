import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import Pagination from './Pagination';
import styles from './DataTable.module.css';

const DataTable = ({ data }) => (
  <div className={styles.container}>
    <Pagination />

    <div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Artist</Table.HeaderCell>

            <Table.HeaderCell>Album</Table.HeaderCell>

            <Table.HeaderCell>Song</Table.HeaderCell>

            <Table.HeaderCell>Genre</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(row => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.artist}</Table.Cell>

              <Table.Cell>{row.album}</Table.Cell>

              <Table.Cell>{row.title}</Table.Cell>

              <Table.Cell>{row.genre}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  </div>
);

const mapStateToProps = state => ({
  data: state.songs,
});

export default connect(mapStateToProps)(DataTable);
