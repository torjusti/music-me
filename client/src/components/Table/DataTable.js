import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import Pagination from './Pagination';
import Details from '../Details';
import styles from './DataTable.module.css';

class DataTable extends Component {
  state = {
    detailsOpen: false,
  };

  handleOpen = () => {
    this.setState({
      detailsOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      detailsOpen: false,
    });

    this.props.dispatch({ type: 'CLOSE_MODAL' });
  };

  render() {
    return (
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

                <Table.HeaderCell>Rating</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.data.map(row => (
                <Fragment key={row.id}>
                  <Details
                    open={this.state.detailsOpen}
                    onClose={this.handleClose}
                    song={row}
                  />

                  <Table.Row className={styles.row} onClick={this.handleOpen}>
                    <Table.Cell>{row.artist}</Table.Cell>
                    <Table.Cell>{row.album}</Table.Cell>
                    <Table.Cell>{row.title}</Table.Cell>
                    <Table.Cell>{row.genre}</Table.Cell>
                    <Table.Cell>{row.rating}</Table.Cell>
                  </Table.Row>
                </Fragment>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.songs,
});

export default connect(mapStateToProps)(DataTable);
