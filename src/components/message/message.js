import React from 'react';
import { Alert } from 'react-bootstrap';
import './message.scss';

// Acceptable variants ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
const Message = ({ children, showMessage, variant }) => {
  return (
    <div className={`message-wrapper ${showMessage ? 'show-message' : ''}`}>
      <Alert variant={variant}>{children}</Alert>
    </div>
  );
};

export default Message;
