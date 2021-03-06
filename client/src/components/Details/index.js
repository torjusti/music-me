import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Modal } from 'semantic-ui-react';
import styles from './details.module.css';
import { sendSongRating } from '../../features/songs/actions';
import Badge from './Badge';
import Rate from './Rate';
import AddSong from '../AddSong';
import DeleteButton from './DeleteButton';

/**
 * A modal window which shows detailed information and controls
 * for a specific song.
 */
const DetailsModal = ({ open, onClose, song, sendSongRating }) => (
  <Modal open={open} onClose={onClose}>
    <Header content="Detailed song information" />

    <Modal.Content>
      <h1>
        {song.artist} - {song.album} - {song.title}
      </h1>

      <Badge label="Genre" value={song.genre} />

      <label className={styles.rate}>Rate:</label>

      <Rate
        className={styles.rate}
        rating={song.rating}
        onClick={rating => sendSongRating(song.id, rating)}
      />

      <p className={styles.content}>{song.description}</p>
    </Modal.Content>

    <Modal.Actions>
      <DeleteButton song={song} onClose={onClose} />

      <AddSong song={song} inverted />

      <Button onClick={onClose} color="blue" inverted>
        Close and save
      </Button>
    </Modal.Actions>
  </Modal>
);

const mapDispatchToProps = {
  sendSongRating,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(DetailsModal);
