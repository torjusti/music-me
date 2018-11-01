import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import Badge from './Badge';

const ModalBasicExample = ({ open, onClose, song }) => (
  <Modal open={open} onClose={onClose}>
    <Header content="Detailed song information" />

    <Modal.Content>
      <h1>
        {song.artist} - {song.album} - {song.title}
      </h1>

      <Badge label="Genre" value={song.genre} />

      <p>{song.description}</p>
    </Modal.Content>

    <Modal.Actions>
      <Button onClick={onClose} color="blue" inverted>
        Close
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ModalBasicExample;
