import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { placeholders, generateUniqueId } from '../../../tools';
import * as actions from '../../../store/actions';

import './details-project-info-form.scss';

const DetailsProjectInfoForm = ({ projectId, showForm }) => {
  const dispatch = useDispatch();
  const projectDetails = useSelector(state => state.projectDetails);

  const specificationObj = {
    name: { en: '', uk: '' },
    value: { en: '', uk: '' },
    id: generateUniqueId(),
  };
  const [detailsData, setDetailsData] = useState({
    ukTitle: '',
    enTitle: '',
    ukText: '',
    enText: '',
  });

  const [specifications, setSpecifications] = useState([]);
  const { enTitle, ukTitle, enText, ukText } = detailsData;

  useEffect(() => {
    if (projectDetails?.projectId !== null) {
      const { projectInfo } = projectDetails.details;
      setDetailsData({
        enTitle: projectInfo.title.en,
        ukTitle: projectInfo.title.uk,
        enText: projectInfo.text.en,
        ukText: projectInfo.text.uk,
      });

      if (projectInfo?.specifications?.length > 0) {
        setSpecifications(projectInfo.specifications.map(s => ({ name: s.name, value: s.value, id: s._id })));
      }
    }
  }, []);

  const updateProjectDetails = (projectId, details) => dispatch(actions.updateProjectDetails(projectId, details));
  
  const handleDetailsDataChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setDetailsData({ ...detailsData, [name]: value });
  };

  const handleSpecificationsChange = (lang, i, e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newSpecs = structuredClone(specifications);
    newSpecs[i][name][lang] = value;
    setSpecifications(newSpecs);
  };

  const handleFormSubmit = () => {
    const submitSpecifications = specifications.map(s => ({ name: s.name, value: s.value }));
    const updatedDetails = {
      detailTitleImage: projectDetails.details.detailTitleImage,
      projectInfo: {
        title: {
          en: enTitle,
          uk: ukTitle,
        },
        text: {
          en: enText,
          uk: ukText,
        },
        specifications: submitSpecifications,
      },
      images: projectDetails.details.images
    };

    updateProjectDetails(projectId, updatedDetails);
    showForm(false);
  };
  
  const addSpecification = () => {
    setSpecifications([...specifications, specificationObj]);
  };

  const removeSpecification = i => {
    const newSpecs = [...specifications];
    newSpecs.splice(i, 1);
    setSpecifications(newSpecs);
  };

  const specificationsFields = specifications.map((spec, i) => (
    <fieldset key={spec.id}>
      <legend>Specification</legend>
      <div className="remove-specification-button-wrapper">
        <Button
          className="remove-specification-button"
          variant="danger"
          size="sm"
          onClick={() => removeSpecification(i)}
        >
          X
        </Button>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <div className="inline-input">
          <Form.Group className="mb-3 inline-input-child">
            <Form.Control
              type="input"
              value={spec.name.en}
              name="name"
              onChange={e => handleSpecificationsChange('en', i, e)}
              placeholder={placeholders.en}
            />
          </Form.Group>

          <Form.Group className="mb-3 inline-input-child">
            <Form.Control
              type="input"
              value={spec.name.uk}
              name="name"
              onChange={e => handleSpecificationsChange('uk', i, e)}
              placeholder={placeholders.uk}
            />
          </Form.Group>
        </div>
        <Form.Label>Value</Form.Label>
        <div className="inline-input">
          <Form.Group className="mb-3 inline-input-child">
            <Form.Control
              type="input"
              value={spec.value.en}
              name="value"
              onChange={e => handleSpecificationsChange('en', i, e)}
              placeholder={placeholders.en}
            />
          </Form.Group>

          <Form.Group className="mb-3 inline-input-child">
            <Form.Control
              type="input"
              value={spec.value.uk}
              name="value"
              onChange={e => handleSpecificationsChange('uk', i, e)}
              placeholder={placeholders.uk}
            />
          </Form.Group>
        </div>
      </Form.Group>
    </fieldset>
  ));

  return (
    <Form noValidate className="update-project-details-form">
      <Form.Group noValidate className="mb-3">
        <Form.Label>Title</Form.Label>
        <div className="inline-input">
          <Form.Group className="mb-3 inline-input-child">
            {/* <Form.Label>Title EN</Form.Label> */}
            <Form.Control
              type="input"
              value={enTitle}
              name="enTitle"
              onChange={handleDetailsDataChange}
              placeholder={placeholders.en}
            />
          </Form.Group>

          <Form.Group className="mb-3 inline-input-child">
            <Form.Control
              type="input"
              value={ukTitle}
              name="ukTitle"
              onChange={handleDetailsDataChange}
              placeholder={placeholders.uk}
            />
          </Form.Group>
        </div>
      </Form.Group>

      <Form.Group noValidate className="mb-3">
        <Form.Label>Text</Form.Label>
        {/* <div className="inline-input"> */}
        <Form.Group className="mb-3 inline-input-child">
          <Form.Control
            as="textarea"
            value={enText}
            name="enText"
            onChange={handleDetailsDataChange}
            placeholder={placeholders.en}
            style={{ height: '100px' }}
          />
        </Form.Group>

        <Form.Group className="mb-3 inline-input-child">
          {/* <Form.Label>Title EN</Form.Label> */}
          <Form.Control
            as="textarea"
            value={ukText}
            name="ukText"
            onChange={handleDetailsDataChange}
            placeholder={placeholders.uk}
            style={{ height: '100px' }}
          />
        </Form.Group>
        {/* </div> */}
      </Form.Group>

      <Form.Group noValidate className="mb-3">
        {specificationsFields}
        <div className="add-specification">
          <Button variant="warning" size="sm" className="add-specification-button" onClick={addSpecification}>
            Add specification
          </Button>
        </div>
      </Form.Group>

      <div className="modal-form-buttons">
        <Button variant="primary" onClick={handleFormSubmit}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default DetailsProjectInfoForm;
