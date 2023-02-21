import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './message.scss';

// Acceptable variants ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
const Message = ({ children, showMessage, cleanupAction, variant='danger' }) => {
  const dispatch = useDispatch();

  useEffect(() => () => dispatch(cleanupAction()), []);

  return (
    <div className={`message-wrapper ${showMessage ? 'show-message' : ''}`}>
      <Alert variant={variant}>{children}</Alert>
    </div>
  );
};

export default Message;
