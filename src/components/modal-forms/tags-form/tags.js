import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';

import './tags.scss';

const TagsForm = () => {

  const defaultSelectorValue = 'AddNewTag';
  const dispatch = useDispatch();
  const [tagSelector, setTagSelector] = useState(defaultSelectorValue);
  const [tagId, setTagId] = useState('');
  const [uaLable, setUaLabel] = useState('');
  const [enLabel, setEnLabel] = useState('');

  const saveTag = tag => dispatch(actions.saveTag(tag));
  
  const handleTagSelectorChange = (e) => setTagSelector(e.target.value);
  const handleTagIdChange = (e) => setTagId(e.target.value);
  const handleUaLabelChange = (e) => setUaLabel(e.target.value);
  const handleEnLabelChange = (e) => setEnLabel(e.target.value);

  const onAddTag = () => {
    const tag = {
      tagId,
      labels: {
        uk: uaLable,
        en: enLabel
      }
    };

    console.log(tag);
    console.log('+++ Add tag +++');
    saveTag(tag);
  };
  
  const onUpdateTag = () => {
    console.log('=== Update tag ===');
  };
  
  const onDeleteTag = () => {
    console.log('--- Delete tag ---');
  };
  
  const TagIdField = (
    <Form.Group className="mb-3" controlId="tagId">
      <Form.Label>Tag ID</Form.Label>
      <Form.Control type="input" onChange={handleTagIdChange} />
    </Form.Group>
  );

  const AddTagButton = (
    <>
      <Button variant="primary" className="mr-3" onClick={onAddTag}>
        Add tag
      </Button>
      {' '}
    </>
  );

  const UpdDelTagButton = (
    <>
      <Button variant="warning" className="mr-3" onClick={onUpdateTag}>
        Update
      </Button>{' '}
      <Button variant="danger" className="mr-3" onClick={onDeleteTag}>
        Delete
      </Button>{' '}
    </>
  );
  
  return (
    <Form className='tags-form'>
      <Form.Group className="mb-3" controlId="tagsList">
        <Form.Label>Select tag or add new tag</Form.Label>
        <Form.Select onChange={handleTagSelectorChange}>
          <option value={defaultSelectorValue}>Add new tag</option>
          <option value='tag1'>Tag1</option>
          <option value='tag2'>Tag2</option>
          <option value='tag3'>Tag3</option>
        </Form.Select>
      </Form.Group>

      {tagSelector === defaultSelectorValue ? TagIdField : null}
      
      <div className='inline-input'>
        <Form.Group className="mb-3 inline-input-child" controlId="ukLabel">
          <Form.Label>UK</Form.Label>
          <Form.Control type="input" onChange={handleUaLabelChange} />
        </Form.Group>
        
        <Form.Group className="mb-3 inline-input-child" controlId="enLabel">
          <Form.Label>EN</Form.Label>
          <Form.Control type="input" onChange={handleEnLabelChange} />
        </Form.Group>
      </div>
      
      {tagSelector === defaultSelectorValue ? AddTagButton : UpdDelTagButton}
      
    </Form>
  );
};

export default TagsForm;
