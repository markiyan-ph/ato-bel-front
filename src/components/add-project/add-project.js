import React from 'react';
import { Modal } from 'react-bootstrap';

const AddProject = ({show, modalClose}) => {
  
  return (
    <Modal show={show} onHide={modalClose}>
      <Modal.Body>
        <h1>Hello modal!</h1>
      </Modal.Body>
    </Modal>
  );
};

export default AddProject;