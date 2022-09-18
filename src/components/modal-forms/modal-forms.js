import React from 'react';
import { Modal, ModalBody } from 'react-bootstrap';

const ModalForm = ({show, modalClose, form}) => {
  
  return (
    <Modal size='lg' show={show} onHide={modalClose}>
      <ModalBody>
        {form}
      </ModalBody>
    </Modal>
  );
};

export default ModalForm;