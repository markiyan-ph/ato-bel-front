import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { placeholders } from '../../../tools';
import * as actions from '../../../store/actions';

import './details-image-block-form.scss';

const DetailsImageBlockForm = ({ projectId, details, showModal, blockIndex }) => {
  const dispatch = useDispatch();
  const [detailsBlockImage, setDetailsBlockImage] = useState(null);
  const [detailsImageData, setDetailsImageData] = useState({
    enImageTitle: '',
    ukImageTitle: '',
    enImageDescription: '',
    ukImageDescription: '',
  });
  // const {i18n} = useTranslation();
  // const lang = i18n.language;

  const { enImageTitle, ukImageTitle, enImageDescription, ukImageDescription } = detailsImageData;

  useEffect(() => {
    if (blockIndex !== null && blockIndex !== undefined) {
      const updatedImgData = details?.images?.[blockIndex];

      if (updatedImgData) {
        setDetailsImageData({
          enImageTitle: updatedImgData?.imgTitle?.en,
          ukImageTitle: updatedImgData?.imgTitle?.uk,
          enImageDescription: updatedImgData?.imgDescription?.en,
          ukImageDescription: updatedImgData?.imgDescription?.uk,
        });
      }
    }
  }, []);

  const addImage = (formData, projectId, details) =>
    dispatch(actions.updateProjectDetailsImage(formData, projectId, details));
  const updateProjectDetails = (projectId, details) => dispatch(actions.updateProjectDetails(projectId, details));
  const handleTitleImageChange = e => {
    setDetailsBlockImage(e.target.files[0]);
  };

  const handleDetailsImageDataChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setDetailsImageData({ ...detailsImageData, [name]: value });
  };

  const handleSubmit = () => {
    const newDetails = JSON.parse(JSON.stringify(details));
    const imgBlockData = {
      imgTitle: {
        en: enImageTitle,
        uk: ukImageTitle,
      },
      imgDescription: {
        en: enImageDescription,
        uk: ukImageDescription,
      },
    };

    if (blockIndex !== null) {
      imgBlockData.img = details?.images?.[blockIndex]?.img;
      newDetails.images[blockIndex] = imgBlockData;
    }

    if (blockIndex === null) {
      newDetails.images.push(imgBlockData);
    }

    if (detailsBlockImage === null) {
      updateProjectDetails(projectId, newDetails);
    } else {
      console.log('BOTH Update image with data');
      const formData = new FormData();
      formData.append('detail-img', detailsBlockImage);
      formData.append('title-image', false);
      formData.append('project-id', projectId);
      if (blockIndex !== null) {
        const currentImage = details?.images?.[blockIndex]?.img;
        if (currentImage && currentImage.length > 0) {
          formData.append('currentImage', currentImage);
        }

        formData.append('image-index', blockIndex);
      } else {
        const newIndex = details?.images.length;
        formData.append('image-index', newIndex);
      }

      // if (blockIndex === 9999) {
      // }
      addImage(formData, projectId, newDetails);
    }
    showModal({ modalState: false, elementIndex: null });
  };

  return (
    <div className="add-image-block-form">
      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleTitleImageChange} />
        <Form.Control.Feedback type="invalid">Please select an image</Form.Control.Feedback>
      </Form.Group>

      <Form.Group noValidate className="mb-3">
        <Form.Label>Title</Form.Label>
        <div className="inline-input">
          <Form.Group className="mb-3 inline-input-child">
            <Form.Control
              type="input"
              value={enImageTitle}
              name="enImageTitle"
              onChange={handleDetailsImageDataChange}
              placeholder={placeholders.en}
            />
          </Form.Group>

          <Form.Group className="mb-3 inline-input-child">
            <Form.Control
              type="input"
              value={ukImageTitle}
              name="ukImageTitle"
              onChange={handleDetailsImageDataChange}
              placeholder={placeholders.uk}
            />
          </Form.Group>
        </div>
      </Form.Group>

      <Form.Group noValidate className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Group className="mb-3 inline-input-child">
          <Form.Control
            as="textarea"
            value={enImageDescription}
            name="enImageDescription"
            onChange={handleDetailsImageDataChange}
            placeholder={placeholders.en}
            style={{ height: '100px' }}
          />
        </Form.Group>

        <Form.Group className="mb-3 inline-input-child">
          <Form.Control
            as="textarea"
            value={ukImageDescription}
            name="ukImageDescription"
            onChange={handleDetailsImageDataChange}
            placeholder={placeholders.uk}
            style={{ height: '100px' }}
          />
        </Form.Group>
      </Form.Group>

      <div className="modal-form-buttons">
        <Button variant="warning" onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default DetailsImageBlockForm;
