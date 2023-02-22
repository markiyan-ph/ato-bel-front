import React, {useState} from 'react';
// import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import * as actions from '../../../store/actions';

const DetailsTitleImageForm = ({projectId, details, showModal, currentImage}) => {
  const dispatch = useDispatch();
  const [projectTitleImage, setTitleImage] = useState(null);
  const [checkValidation, setCheckValidation] = useState(false);
  // const {i18n} = useTranslation();
  // const lang = i18n.language;

  const addImage = (formData, projectId, details) => dispatch(actions.updateProjectDetailsImage(formData, projectId, details));
  const handleTitleImageChange = e => {
    setTitleImage(e.target.files[0]);
  };
  
  const handleSubmit = () => {
    setCheckValidation(false);
    if (projectTitleImage === null) {
      setCheckValidation(true);
    } else {
      const formData = new FormData();
      formData.append('detail-img', projectTitleImage);
      formData.append('title-image', true);
      formData.append('project-id', projectId);
      if (currentImage) {
        formData.append('current-image', currentImage);
      }
      
      addImage(formData, projectId, details);
      showModal(false);
    }
  };

  return (
    <div className="add-project-form">
      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleTitleImageChange} isInvalid={checkValidation ? projectTitleImage === null : false} />
        <Form.Control.Feedback type="invalid">Please select an image</Form.Control.Feedback>
      </Form.Group>

      <div className='modal-form-buttons'>
        {/* <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button> */}
        <Button variant="warning" onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default DetailsTitleImageForm;