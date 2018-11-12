import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import AddSongForm from './AddSongForm';
import { addSong, updateSong } from '../../features/songs/actions';

class AddSong extends Component {
  state = {
    modalOpen: false,
  };

  handleOpen = () => {
    this.setState({
      modalOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  handleSubmit = song => {
    const { id, ...rest } = song;

    // This is the case if we are attempting to update a song. If not, we
    // are simply creating a new song.
    if (id) {
      this.props.updateSong(id, rest);
    } else {
      this.props.addSong(rest);
    }

    this.handleClose();
  };

  render() {
    return (
      <Fragment>
        <Button
          color="blue"
          onClick={this.handleOpen}
          content={this.props.song ? 'Edit song' : 'Add song'}
          inverted={this.props.inverted}
        />

        <AddSongForm
          open={this.state.modalOpen}
          onClose={this.handleClose}
          onSubmit={this.handleSubmit}
          song={this.props.song}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  addSong,
  updateSong,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(AddSong);
