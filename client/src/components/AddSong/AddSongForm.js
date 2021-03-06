import React, { Component } from 'react';
import { Form, Modal, Button, Header, Message } from 'semantic-ui-react';
import Rate from '../Details/Rate';

const initialState = {
  // The currently entered rating.
  rating: undefined,

  // The currently entered title.
  title: '',

  // The currently entered artist.
  artist: '',

  // The currently entered album.
  album: '',

  // The currently entered genre.
  genre: '',

  // The currently entered description.
  description: '',

  // Whether or not the submit button has been clicked once, so
  // that errors can be shown.
  showErrors: false,
};

class AddSongForm extends Component {
  state = initialState;

  initializeForm = () => {
    if (this.props.song) {
      return this.setState({
        ...initialState,
        ...this.props.song,
      });
    }

    this.setState(initialState);
  };

  componentDidMount() {
    this.initializeForm();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.initializeForm();
    }
  }

  handleSubmit = () => {
    const { title, artist, album, genre, description } = this.state;

    // Check if all required fields are filled.
    if (title && artist && album && genre && description) {
      this.setState({
        showErrors: false,
      });

      this.props.onSubmit({
        // We need to give undefined instead of null to the
        // serializer in order to give correct data to the server.
        rating: this.state.rating || undefined,
        title: this.state.title,
        artist: this.state.artist,
        album: this.state.album,
        genre: this.state.genre,
        description: this.state.description,
        id: this.state.id,
      });

      return;
    }

    // Errors are remainding, so show theml.
    this.setState({
      showErrors: true,
    });
  };

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose} data-component="AddEditForm">
        <Header content={this.props.song ? 'Edit song' : 'Add song'} />

        <Modal.Content>
          <Form error={this.state.showErrors}>
            <Message
              error
              header="Unable to add song"
              content="Please fill in all required fields before submitting the form again."
            />

            <Form.Field
              label="Rating"
              control={Rate}
              rating={this.state.rating}
              onClick={rating => this.setState({ rating })}
            />

            <Form.Input
              fluid
              required
              label="Title"
              placeholder="Title"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
              error={this.state.showErrors && !this.state.title}
              maxLength={100}
            />

            <Form.Input
              fluid
              required
              label="Artist"
              placeholder="Artist"
              value={this.state.artist}
              onChange={e => this.setState({ artist: e.target.value })}
              error={this.state.showErrors && !this.state.artist}
              maxLength={100}
            />

            <Form.Input
              fluid
              required
              label="Album"
              placeholder="Album"
              value={this.state.album}
              onChange={e => this.setState({ album: e.target.value })}
              error={this.state.showErrors && !this.state.album}
              maxLength={100}
            />

            <Form.Input
              fluid
              required
              label="Genre"
              placeholder="Genre"
              value={this.state.genre}
              onChange={e => this.setState({ genre: e.target.value })}
              error={this.state.showErrors && !this.state.genre}
              maxLength={100}
            />

            <Form.TextArea
              required
              label="Description"
              placeholder="Description"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
              error={this.state.showErrors && !this.state.description}
            />
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="red" onClick={this.props.onClose} content="Cancel" />

          <Button color="blue" onClick={this.handleSubmit} content="Save" />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AddSongForm;
