import React from 'react';
import { Message, Button } from 'semantic-ui-react';

const ErrorMessage = ({ onClick }) => (
  <Message negative>
    <Message.Header>Error loading data</Message.Header>

    <p>An error occurred while loading data from the server.</p>

    <Button color="blue" content="Try again" onClick={onClick} />
  </Message>
);

export default ErrorMessage;
