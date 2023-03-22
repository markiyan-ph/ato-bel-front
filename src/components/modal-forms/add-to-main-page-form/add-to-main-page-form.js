import React, {useState} from 'react';
// import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
// import Select from 'react-select';
import * as actions from '../../../store/actions';

const AddToMainPageForm = ({showModal, projectId}) => {
  const dispatch = useDispatch();
  const [projectMainPageImage, setProjectMainPageImage] = useState(null);
  const [checkValidation, setCheckValidation] = useState(false);
  // const {i18n} = useTranslation();
  // const lang = i18n.language;

  const addImageToMainPage = formData => dispatch(actions.addMainPageProjectImage(formData));
  const deleteImageToMainPage = projectId => dispatch(actions.deleteMainPageProjectImage(projectId));
  const handleProjectMainPageImageChange = e => {
    setProjectMainPageImage(e.target.files[0]);
  };
  
  const handleSubmit = () => {
    console.log('Save main page image');
    setCheckValidation(false);
    if (projectMainPageImage === null) {
      setCheckValidation(true);
    } else {
      const formData = new FormData();
      formData.append('project-main-image', projectMainPageImage);
      formData.append('project-id', projectId);
      
      addImageToMainPage(formData);
      showModal(false);
    }
  };

  const handleDelete = () => {
    console.log('Delete main page image');
    deleteImageToMainPage(projectId);
    showModal(false);

  };

  return (
    <div className="add-main-page-image-form">
      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Project main page image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleProjectMainPageImageChange} isInvalid={checkValidation ? projectMainPageImage === null : false} />
        <Form.Control.Feedback type="invalid">Please select an image</Form.Control.Feedback>
      </Form.Group>

      <div className='modal-form-buttons'>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="warning" onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default AddToMainPageForm;
