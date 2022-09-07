import React from 'react';
import { Modal } from 'react-bootstrap';
import AddProjectForm from './add-project-form';

const AddProject = ({show, modalClose}) => {
  
  return (
    <Modal show={show} onHide={modalClose}>
      <Modal.Body>
        <AddProjectForm />
      </Modal.Body>
    </Modal>
  );
};

export default AddProject;