import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Button, Label } from 'semantic-ui-react';
import { setPage } from '../../features/pagination/actions';
import styles from './Table.module.css';

class DataTable extends Component {

  handleNextPage = () => {
    // TODO Replace 1 with total pages + check label in render
    this.props.setPage(this.props.page + 1);
  };

  handlePrevPage = () => {
    this.props.setPage(this.props.page - 1);
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Button onClick={this.handlePrevPage}
                  disabled={this.props.page === 0}
          >
            <Icon name="angle left"/>
          </Button>
          <Label>
            {`${this.props.page} of ${1}`}
          </Label>
          <Button onClick={this.handleNextPage}
                  disabled={this.props.page === 1}
          >
            <Icon name="angle right"/>
          </Button>
        </div>
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
              {this.props.data.map(row => (
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
    )
  }
}


const mapStateToProps = state => ({
  data: state.songs,
  page: state.page,
});

const mapDispatchToProps = {
  setPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataTable);
