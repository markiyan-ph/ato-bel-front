import React from 'react';
import { Button, Form } from 'react-bootstrap';

import './add-project-form.scss';

const AddProjectForm = () => {
  return (
    <Form className='add-project-form'>
      <Form.Group className="mb-3" controlId="titles">
        <Form.Label>Project title</Form.Label>
        <div className='inline-input'>
          <Form.Control type="text" placeholder="Enter english title" />
          <Form.Control type="text" placeholder="Enter ukraine title" />
        </div>
        {/* <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Project image</Form.Label>
        <Form.Control type="file" accept='image/*' />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddProjectForm;
