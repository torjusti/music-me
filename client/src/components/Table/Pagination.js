import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../features/pagination/actions';
import { Icon, Button, Form } from 'semantic-ui-react';
import clamp from 'lodash/clamp';
import styles from './Pagination.module.css';

/**
 * Input box for setting the pagination page manually.
 */
class PageInput extends Component {
  state = {
    page: 1,
  };

  componentDidMount() {
    this.setState({
      page: this.props.pagination.page + 1,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        page: this.props.pagination.page + 1,
      });
    }
  }

  handleChange = event => {
    this.setState({
      page: event.target.value,
    });
  };

  updatePage = () => {
    const current = this.props.pagination.page;

    const page = parseInt(this.state.page, 10) - 1 || current;

    this.props.setPage(clamp(page, 0, this.props.pagination.totalPages - 1));
  };

  handlePress = event => {
    if (event.key === 'Enter') {
      this.updatePage();
    }
  };

  render() {
    return (
      <input
        value={this.state.page}
        onChange={this.handleChange}
        onKeyPress={this.handlePress}
        className={styles.pageInput}
        type="number"
      />
    );
  }
}

/**
 * The two buttons and the display above the table, which
 * allows the user to change the page to show in the table.
 */
export const Pagination = props => {
  const { pagination, setPage } = props;

  return (
    <div className={styles.header}>
      <Button
        className={styles.button}
        onClick={() => setPage(pagination.page - 1)}
        disabled={pagination.page === 0}
      >
        <Icon name="angle left" />
        Prev
      </Button>

      <span className={styles.label}>
        {pagination.totalPages === 0 ? (
          <Fragment>No results</Fragment>
        ) : (
          <Fragment>
            Page <PageInput {...props} /> of {pagination.totalPages}
          </Fragment>
        )}
      </span>

      <Button
        className={styles.button}
        onClick={() => setPage(pagination.page + 1)}
        disabled={
          pagination.page === pagination.totalPages - 1 ||
          pagination.totalPages === 0
        }
      >
        Next
        <Icon name="angle right" />
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  pagination: state.pagination,
});

const mapDispatchToProps = {
  setPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pagination);
