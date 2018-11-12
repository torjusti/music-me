import React from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../features/pagination/actions';
import { Icon, Button } from 'semantic-ui-react';
import styles from './Pagination.module.css';

/**
 * The two buttons and the display above the table, which
 * allows the user to change the page to show in the table.
 */
export const Pagination = ({ pagination, setPage }) => (
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
      {pagination.totalPages === 0
        ? 'No results'
        : `${pagination.page + 1} of ${pagination.totalPages}`}
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
