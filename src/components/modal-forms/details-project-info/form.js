import React, { useState } from 'react';
// import { Button, Form, Spinner } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import * as actions from '../../../store/actions';

import './form.scss';

const DetailsProjectInfoForm = () => {
  // const defaultSelectorValue = 'AddNewTag';
  // const dispatch = useDispatch();
  // const loading = useSelector(state => state.tags.loading);
  // const tags = useSelector(state => state.tags.tagsList);
  const [detailsData, setDetailsData] = useState({
    ukTitle: '',
    enTitle: '',
    ukText: '',
    enText: '',
    specifications: []
  });

  const {
    ukTitle,
    enTitle,
    // ukText,
    // enText,
    // specifications
  } = detailsData;
  // const [tagId, setTagId] = useState('');
  // const [ukLable, setUkLabel] = useState('');
  // const [enLabel, setEnLabel] = useState('');

  // useEffect(() => {
  //   if (tags.length === 0) {
  //     dispatch(actions.fetchTags());
  //   }
  // }, []);
  
  // const saveTag = tag => dispatch(actions.saveTag(tag));
  // const updateTag = tag => dispatch(actions.updateTag(tag));
  // const deleteTag = tagId => dispatch(actions.deleteTag(tagId));

  // const cleanFields = () => {
  //   setTagId('');
  //   setUkLabel('');
  //   setEnLabel('');
  // };

  // const handleTagSelectorChange = e => {
  //   const selectorValue = e.target.value;
  //   if (selectorValue === defaultSelectorValue) {
  //     cleanFields();
  //   } else {
  //     setUkLabel(tags.find(tag => tag.tagId === selectorValue).labels.uk);
  //     setEnLabel(tags.find(tag => tag.tagId === selectorValue).labels.en);
  //   }
  //   setTagSelector(selectorValue);
  // };

  const handleDetailsDataChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setDetailsData({...detailsData, [name]: value});
  };
  // const handleUaLabelChange = e => setUkLabel(e.target.value);
  // const handleEnLabelChange = e => setEnLabel(e.target.value);
  // const notValidTagId = tags.findIndex(currTag => currTag.tagId === tagId) !== -1;

  // const onAddTag = () => {
  //   const tag = {
  //     tagId,
  //     labels: {
  //       uk: ukLable,
  //       en: enLabel,
  //     },
  //   };

  //   if (notValidTagId) {
  //     return;
  //   }

  //   saveTag(tag);
  //   cleanFields();
  // };

  // const onUpdateTag = () => {
  //   const tagId = tagSelector;
  //   const tag = {
  //     tagId,
  //     labels: {
  //       uk: ukLable,
  //       en: enLabel,
  //     },
  //   };

  //   if (notValidTagId) {
  //     return;
  //   }

  //   updateTag(tag);
  // };
  
  // const onDeleteTag = () => {
  //   const tagId = tagSelector;
  //   deleteTag(tagId);
  //   setTagSelector(defaultSelectorValue);
  //   cleanFields();
  // };

  // const tagsOptions = tags.map(currTag => (
  //   <option key={currTag.tagId} value={currTag.tagId}>
  //     {currTag.tagId}
  //   </option>
  // ));

  // const TagIdField = (
  //   <Form.Group className="mb-3" controlId="tagId">
  //     <Form.Label>Tag ID</Form.Label>
  //     <Form.Control
  //       type="input"
  //       value={tagId}
  //       onChange={handleTagIdChange}
  //       isInvalid={notValidTagId}
  //       required
  //     />
  //     <Form.Control.Feedback type="invalid">Please enter unique tad id</Form.Control.Feedback>
  //   </Form.Group>
  // );

  // const spinner = <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />;

  // const AddTagButton = (
  //   <>
  //     <Button variant="primary" className="mr-3" onClick={onAddTag}>
  //       {loading ? spinner : null} Add tag
  //     </Button>{' '}
  //   </>
  // );

  // const UpdDelTagButton = (
  //   <>
  //     <Button variant="warning" className="mr-3" onClick={onUpdateTag}>
  //       {loading ? spinner : null} Update
  //     </Button>{' '}
  //     <Button variant="danger" className="mr-3" onClick={onDeleteTag}>
  //       {loading ? spinner : null} Delete
  //     </Button>{' '}
  //   </>
  // );

  return (
    <Form noValidate className="update-project-details-form">
      <div className="inline-input">
        <Form.Label>Title</Form.Label>
        <Form.Group className="mb-3 inline-input-child" name="ukTitle">
          <Form.Label>UK</Form.Label>
          <Form.Control type="input" value={ukTitle} onChange={handleDetailsDataChange} />
        </Form.Group>

        <Form.Group className="mb-3 inline-input-child" name="enTitle">
          <Form.Label>EN</Form.Label>
          <Form.Control type="input" value={enTitle} onChange={handleDetailsDataChange} />
        </Form.Group>
      </div>
    </Form>
  );
};

export default DetailsProjectInfoForm;
