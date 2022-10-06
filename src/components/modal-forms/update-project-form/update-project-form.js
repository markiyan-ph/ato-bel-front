import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import * as actions from '../../../store/actions';

import './update-project-form.scss';

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

const UpdateProjectForm = ({showModal, projectId}) => {
  const dispatch = useDispatch();
  const projectsList = useSelector(state => state.projects.projectsList);
  const tags = useSelector(state => state.tags.tagsList);
  const [projectTags, setProjectTags] = useState([]);
  const updatingProject = projectsList.find(pr => pr._id === projectId);
  const [projectImage, setProjectImage] = useState('');
  const [projectData, setProjectData] = useState({
    projectDate: '',
    projectTitleUk: '',
    projectTitleEn: '',
    projectSubtitleUk: '',
    projectSubtitleEn: '',
    projectOldImage: ''
  });
  const {i18n} = useTranslation();
  const lang = i18n.language;

  const {
    projectDate,
    projectTitleUk,
    projectTitleEn,
    projectSubtitleUk,
    projectSubtitleEn,
    projectOldImage
  } = projectData;

  const options = tags.map(tag => ({value: tag.tagId, label: tag.labels[lang]}));

  useEffect(() => {
    setProjectData({
      projectDate: updatingProject.date,
      projectTitleUk: updatingProject.title['uk'],
      projectTitleEn: updatingProject.title['en'],
      projectSubtitleUk: updatingProject.subtitle['uk'],
      projectSubtitleEn: updatingProject.subtitle['en'],
      projectOldImage: updatingProject.image
    });
    setProjectTags(options.filter(tag => updatingProject.tags.includes(tag.value)));
  }, []);

  const updateProject = formData => dispatch(actions.updateProject(formData));
  const handleProjectDataChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setProjectData({...projectData, [name]: value});
  };
  const handleProjectImageChange = e => setProjectImage(e.target.files[0]);
  const handleProjectTagsChange = e => setProjectTags(e);
  
  const handleSubmit = () => {
    const formData = new FormData();
    const formDataTags = JSON.stringify(projectTags.length > 0 ? projectTags.map(opt => opt.value) : []);

    formData.append('project-image', projectImage === '' ? null : projectImage);
    formData.append('project-old-image', projectOldImage);
    formData.append('project-name-uk', projectTitleUk);
    formData.append('project-name-en', projectTitleEn);
    formData.append('project-subtitle-uk', projectSubtitleUk);
    formData.append('project-subtitle-en', projectSubtitleEn);
    formData.append('project-date', projectDate);
    formData.append('project-tags', formDataTags);
    formData.append('project-id', projectId);

    updateProject(formData);
    showModal(false);
  };
  const notValidProjectDate = !regex.test(projectData.projectDate);

  return (
    <div className="update-project-form">
      <Form.Group noValidate className="mb-3" controlId="titles">
        <Form.Label>Project title</Form.Label>
        <div className="inline-input">
          <Form.Control type="text" placeholder="Enter english title" name="projectTitleEn" value={projectTitleEn} onChange={handleProjectDataChange} />
          <Form.Control type="text" placeholder="Enter ukraine title" name="projectTitleUk" value={projectTitleUk} onChange={handleProjectDataChange} />
        </div>
      </Form.Group>
      
      <Form.Group noValidate className="mb-3" controlId="titles">
        <Form.Label>Project subtitle</Form.Label>
        <div className="inline-input">
          <Form.Control type="text" placeholder="Enter english subtitle" name="projectSubtitleEn" value={projectSubtitleEn} onChange={handleProjectDataChange} />
          <Form.Control type="text" placeholder="Enter ukraine subtitle" name="projectSubtitleUk" value={projectSubtitleUk} onChange={handleProjectDataChange} />
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Upload new image</Form.Label>
        <Form.Control type="file" accept="image/*" name="projectImage" onChange={handleProjectImageChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="tagId">
        <Form.Label>Project date</Form.Label>
        <Form.Control type="input" name="projectDate" value={projectDate} onChange={handleProjectDataChange} isInvalid={notValidProjectDate} />
        <Form.Control.Feedback type="invalid">Please enter valid date</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Select react tags</Form.Label>
        <Select
          closeMenuOnSelect={false}
          onChange={handleProjectTagsChange}
          name="projectTags"
          value={projectTags}
          styles={colourStyles}
          isMulti
          options={options}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default UpdateProjectForm;
