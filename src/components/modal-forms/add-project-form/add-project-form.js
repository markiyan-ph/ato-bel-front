import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import * as actions from '../../../store/actions';

// Tags related constants
const color = '#ffffff';
const backgroundColor = '#0d6efd';
const crosHover = '#01bd07';

const colourStyles = {
  // dropdownIndicator: styles => ({
  //   ...styles,
  //   color: '#000000',
  // }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: backgroundColor,
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: color,
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: color,
    ':hover': {
      backgroundColor: crosHover,
      color: color,
    },
  }),
};

// Datefield validation mask
const regex = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$');

const AddProjectForm = ({ showModal }) => {
  const dispatch = useDispatch();
  const [projectDate, setProjectDate] = useState(new Date().toISOString().split('T')[0]);
  const [projectImage, setProjectImage] = useState(null);
  const [checkValidation, setCheckValidation] = useState(false);
  const [projectTitleUk, setProjectTitleUk] = useState('');
  const [projectTitleEn, setProjectTitleEn] = useState('');
  const [projectSubtitleUk, setProjectSubtitleUk] = useState('');
  const [projectSubtitleEn, setProjectSubtitleEn] = useState('');
  const [projectTags, setProjectTags] = useState([]);
  const tags = useSelector(state => state.tags.tagsList);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const options = tags.map(tag => ({ value: tag.tagId, label: tag.labels[lang] }));

  const addProject = (formData) => dispatch(actions.addProject(formData));
  const handleProjectDateChange = e => setProjectDate(e.target.value);
  const handleProjectImageChange = e => {
    setProjectImage(e.target.files[0]);
  };
  const handleProjectTitleUkChange = e => setProjectTitleUk(e.target.value);
  const handleProjectTitleEnChange = e => setProjectTitleEn(e.target.value);
  const handleProjectSubtitleUkChange = e => setProjectSubtitleUk(e.target.value);
  const handleProjectSubtitleEnChange = e => setProjectSubtitleEn(e.target.value);
  const handleProjectTagsChange = e => setProjectTags(e);

  const handleSubmit = () => {
    if (projectImage === null || notValidProjectDate) {
      setCheckValidation(true);
    } else {
      const formData = new FormData();
      const formDataTags = JSON.stringify(projectTags.length > 0 ? projectTags.map(opt => opt.value) : []);

      formData.append('project-image', projectImage);
      formData.append('project-name-uk', projectTitleUk);
      formData.append('project-name-en', projectTitleEn);
      formData.append('project-subtitle-uk', projectSubtitleUk);
      formData.append('project-subtitle-en', projectSubtitleEn);
      formData.append('project-date', projectDate);
      formData.append('project-tags', formDataTags);

      addProject(formData);
      showModal(false);
    }
  };
  const notValidProjectDate = !regex.test(projectDate);

  return (
    <div className="add-project-form">
      <Form.Group noValidate className="mb-3" controlId="titles">
        <Form.Label>Project title</Form.Label>
        <div className="inline-input">
          <Form.Control
            type="text"
            placeholder="Enter english title"
            value={projectTitleEn}
            onChange={handleProjectTitleEnChange}
            isInvalid={checkValidation ? projectTitleEn.trim().length === 0 : false}
          />
          <Form.Control
            type="text"
            placeholder="Enter ukraine title"
            value={projectTitleUk}
            onChange={handleProjectTitleUkChange}
            isInvalid={checkValidation ? projectTitleEn.trim().length === 0 : false}
          />
          <Form.Control.Feedback type="invalid">Please enter titles</Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group noValidate className="mb-3" controlId="titles">
        <Form.Label>Project subtitle</Form.Label>
        <div className="inline-input">
          <Form.Control
            type="text"
            placeholder="Enter english subtitle"
            value={projectSubtitleEn}
            onChange={handleProjectSubtitleEnChange}
          />
          <Form.Control
            type="text"
            placeholder="Enter ukraine subtitle"
            value={projectSubtitleUk}
            onChange={handleProjectSubtitleUkChange}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Project image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleProjectImageChange}
          isInvalid={checkValidation ? projectImage === null : false}
        />
        <Form.Control.Feedback type="invalid">Please select an image</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="tagId">
        <Form.Label>Project date</Form.Label>
        <Form.Control
          type="input"
          value={projectDate}
          onChange={handleProjectDateChange}
          isInvalid={checkValidation ? notValidProjectDate : false}
        />
        <Form.Control.Feedback type="invalid">Please enter valid date</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Select react tags</Form.Label>
        <Select
          closeMenuOnSelect={false}
          onChange={handleProjectTagsChange}
          value={projectTags}
          styles={colourStyles}
          isMulti
          options={options}
        />
      </Form.Group>
      <div className="modal-form-buttons">
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddProjectForm;
