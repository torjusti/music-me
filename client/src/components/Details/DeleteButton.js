import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Confirm } from 'semantic-ui-react';
import { deleteSong } from '../../common/api';
import { showToast } from '../../features/toasts/actions';

class DeleteButton extends Component {
  state = {
    loading: false,
  };

  handleDelete = async () => {
    this.setState({
      loading: true,
    });

    const response = await deleteSong(this.props.song.id);

    if (response.success) {
      this.props.onClose();
      this.props.fetchPage();
      this.props.showToast('Song successfully deleted');
      return;
    }

    this.props.showToast('An error occurred deleting the song');

    this.setState({
      loading: false,
    });
  };

  handleClick = () => {
    // If the button was already clicked, ignore the click.
    if (this.state.loading) {
      return;
    }

    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleConfirm = () => {
    this.handleClose();
    this.handleDelete();
  };

  render() {
    return (
      <Fragment>
        <Button
          color="red"
          content="Delete song"
          onClick={this.handleClick}
          loading={this.state.loading}
          inverted
        />

        <Confirm
          open={this.state.open}
          onCancel={this.handleClose}
          onConfirm={this.handleConfirm}
          header="Are you sure?"
          content="Do you really wish to delete this song? This action is not reversible."
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showToast: message => {
    dispatch(showToast(message));
  },

  fetchPage: () => {
    dispatch({ type: 'FETCH_CURRENT_PAGE' });
  },
});

export default connect(
  undefined,
  mapDispatchToProps,
)(DeleteButton);
