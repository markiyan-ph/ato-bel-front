import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationForm = ({
  show,
  close,
  cancelButtonLabel = 'No',
  yesButtonLabel = 'Yes',
  title = '',
  bodyText = 'Are you sure?',
  confirmAction = null,
  actionParams = [],
}) => {
  return (
    <Modal show={show} onHide={close} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyText}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          {cancelButtonLabel}
        </Button>
        <Button variant="primary" onClick={
          () => {
            confirmAction(...actionParams);
            close();
          }
        }>
          {yesButtonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationForm;
