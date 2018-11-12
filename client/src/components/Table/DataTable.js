import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Loader, Dimmer } from 'semantic-ui-react';
import AddSong from '../AddSong';
import styles from './DataTable.module.css';
import Pagination from './Pagination';
import Details from '../Details';
import {
  setColumn,
  toggleDirection,
  clearOrder,
} from '../../features/order/actions';

/**
 * The table which shows song information that has been loaded from the server.
 */
export class DataTable extends Component {
  state = {
    // Whether or not the details modal is open.
    openModal: null,
    // The column on which we are sorting.
    orderBy: null,
    // The way in which we are sorting.
    ordering: 'ascending',
  };

  /**
   * Handles opening of the details modal.
   */
  handleOpen = id => {
    this.setState({
      openModal: id,
    });
  };

  /**
   * Handles closing of the details modal.
   */
  handleClose = () => {
    this.setState({
      openModal: null,
    });

    // See the saga file for songs for more information about this action.
    // This exists to refresh the list of songs on modal closing, as the
    // songs on the current page may have been updated. However, we can not
    // refresh in the background, as it could cause the modal to get unmounted.
    this.props.dispatch({ type: 'CLOSE_MODAL' });
  };

  /**
   * Handles the click on a column header. This should switch to the
   * next sorting mode on that specific column.
   */
  handleOrder = column => {
    if (this.state.orderBy === column) {
      if (this.state.ordering === 'ascending') {
        this.props.dispatch(toggleDirection());
        this.setState({
          ordering: 'descending',
        });
      } else {
        this.props.dispatch(clearOrder());
        this.setState({
          orderBy: null,
          ordering: 'ascending',
        });
      }
    } else {
      this.props.dispatch(setColumn(column));
      this.setState({
        orderBy: column,
        ordering: 'ascending',
      });
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <Pagination />

        <Dimmer.Dimmable>
          <Dimmer inverted active={this.props.songs.loading}>
            <Loader />
          </Dimmer>

          <Table sortable>
            <Table.Header className={styles.tableHeader}>
              <Table.Row>
                <Table.HeaderCell
                  sorted={
                    this.state.orderBy === 'title' ? this.state.ordering : null
                  }
                  onClick={() => this.handleOrder('title')}
                >
                  Song
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={
                    this.state.orderBy === 'artist' ? this.state.ordering : null
                  }
                  onClick={() => this.handleOrder('artist')}
                >
                  Artist
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={
                    this.state.orderBy === 'album' ? this.state.ordering : null
                  }
                  onClick={() => this.handleOrder('album')}
                >
                  Album
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={
                    this.state.orderBy === 'genre' ? this.state.ordering : null
                  }
                  onClick={() => this.handleOrder('genre')}
                >
                  Genre
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={
                    this.state.orderBy === 'rating' ? this.state.ordering : null
                  }
                  onClick={() => this.handleOrder('rating')}
                >
                  Rating
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.songs.data.map(row => (
                <Fragment key={row.id}>
                  <Details
                    open={this.state.openModal === row.id}
                    onClose={this.handleClose}
                    song={row}
                  />

                  <Table.Row
                    className={styles.row}
                    onClick={() => this.handleOpen(row.id)}
                  >
                    <Table.Cell>{row.title}</Table.Cell>
                    <Table.Cell>{row.artist}</Table.Cell>
                    <Table.Cell>{row.album}</Table.Cell>
                    <Table.Cell>{row.genre}</Table.Cell>
                    <Table.Cell>{row.rating}</Table.Cell>
                  </Table.Row>
                </Fragment>
              ))}
            </Table.Body>
          </Table>
        </Dimmer.Dimmable>

        <div className={styles.addSong}>
          <AddSong />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  songs: state.songs,
});

export default connect(mapStateToProps)(DataTable);
