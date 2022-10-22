import React, {useState} from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
// import Select from 'react-select';
// import * as actions from '../../../store/actions';

const AddToMainPageForm = ({showModal}) => {
  // const dispatch = useDispatch();
  const [projectMainPageImage, setProjectMainPageImage] = useState(null);
  const [checkValidation, setCheckValidation] = useState(false);
  // const {i18n} = useTranslation();
  // const lang = i18n.language;

  // const addImageToMainPage = formData => dispatch(actions.addProject(formData));
  const handleProjectMainPageImageChange = e => {
    setProjectMainPageImage(e.target.files[0]);
  };
  
  const handleSubmit = () => {
    console.log('Save main page image');
    setCheckValidation(false);
    // if (projectMainPageImage === null) {
    //   setCheckValidation(true);
    // } else {
    //   const formData = new FormData();
    //   formData.append('project-main-page-image', projectMainPageImage);
      
    //   // addImageToMainPage(formData);
    //   showModal(false);
    // }
    showModal(false);
  };

  const handleDelete = () => {
    console.log('Delete main page image');
  };

  return (
    <div className="add-project-form">
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
