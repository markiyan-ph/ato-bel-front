import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';

const ModalForm = ({show, modalClose, form, formTitle = ''}) => {
  
  return (
    <Modal size='lg' backdrop='static' show={show} onHide={modalClose} >
      <ModalHeader closeButton>
        <ModalTitle>{formTitle}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {form}
      </ModalBody>
    </Modal>
  );
};

export default ModalForm;