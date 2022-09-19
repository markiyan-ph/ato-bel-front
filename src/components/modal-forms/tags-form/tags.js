import React from 'react';
import { Button, Form } from 'react-bootstrap';

import './tags.scss';

const TagsForm = () => {
  const onAddTag = () => {
    console.log('+++ Add tag +++');
  };
  
  const onUpdateTag = () => {
    console.log('=== Update tag ===');
  };
  
  const onDeleteTag = () => {
    console.log('--- Delete tag ---');
  };
  
  
  return (
    <Form className='tags-form'>
      <Form.Group className="mb-3" controlId="tagsList">
        <Form.Label>Select tag or add new tag</Form.Label>
        <Form.Select>
          <option value='AddNewTag'>Add new tag</option>
          <option value='tag1'>Tag1</option>
          <option value='tag2'>Tag2</option>
          <option value='tag3'>Tag3</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="tagId">
        <Form.Label>Tag ID</Form.Label>
        <Form.Control type="input" />
      </Form.Group>
      
      <div className='inline-input'>
        <Form.Group className="mb-3 inline-input-child" controlId="ukLabel">
          <Form.Label>UK</Form.Label>
          <Form.Control type="input" />
        </Form.Group>
        
        <Form.Group className="mb-3 inline-input-child" controlId="enLabel">
          <Form.Label>EN</Form.Label>
          <Form.Control type="input" />
        </Form.Group>
      </div>
      
      <Button variant="primary" className="mr-3" onClick={onAddTag}>
        Add tag
      </Button>{' '}
      <Button variant="warning" className="mr-3" onClick={onUpdateTag}>
        Update
      </Button>{' '}
      <Button variant="danger" className="mr-3" onClick={onDeleteTag}>
        Delete
      </Button>
    </Form>
  );
};

export default TagsForm;
