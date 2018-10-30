import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import styles from './Table.module.css';

const DataTable = ({ data }) => (
  <div className={styles.container}>
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
);

const mapStateToProps = state => ({
  data: state.songs,
});

export default connect(mapStateToProps)(DataTable);
