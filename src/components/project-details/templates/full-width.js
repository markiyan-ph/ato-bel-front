import React, { useEffect, useState } from 'react';
import { ArrowUpShort } from 'react-bootstrap-icons';
import DetailEditTool from '../detail-edit-tool';

import Content from '../../content';
import './full-width.scss';
import { Button } from 'react-bootstrap';

const EditProjectInfoButton = ({ editInfo }) => (
  <div className="edit-project-info-button">
    <Button onClick={editInfo}>Edit</Button>
  </div>
);

const AddImageBlock = ({ addImageBlock }) => (
  <div className="add-image-block-button">
    <Button variant="outline-primary" onClick={() => addImageBlock({ modalState: true, elementIndex: null })}>
      Add image block
    </Button>
  </div>
);

const FullWidthTemplate = ({
  projectId,
  projectDetailsObj,
  language,
  isAdmin,
  editInfo,
  editTitleImage,
  addImageBlock,
  loading,
}) => {
  const [showToTopButton, setShowToTopButton] = useState(false);
  const detailImgsPath = `/uploads/${projectId}/detail-imgs`;
  const imageStatic = <img src="/static/main_detail.jpeg" alt="Default edit image" loading="lazy" />;
  const detailsMainImageExists = projectDetailsObj?.detailTitleImage?.length > 0;

  const backToTopClick = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');

    if (!loading) {
      setShowToTopButton(document.body.scrollHeight - document.body.clientHeight > 200);

      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo({ top: parseInt(scrollPosition), left: 0, behavior: 'auto' });
          sessionStorage.removeItem('scrollPosition');
        }, 300);
      }
    }
  }, [loading]);

  const specificationsNames = projectDetailsObj.projectInfo.specifications.map(specification => (
    <div key={specification._id + 'name'}>{specification.name[language]}</div>
  ));

  const specificationsValues = projectDetailsObj.projectInfo.specifications.map(specification => (
    <div key={specification._id + 'value'}>{specification.value[language]}</div>
  ));

  const images = projectDetailsObj.images.map((imageData, i) => (
    <div className="image-data-container" key={imageData._id}>
      <div className="image">
        {isAdmin ? (
          <DetailEditTool
            editModalClick={() => addImageBlock({ modalState: true, elementIndex: i })}
            deleteData={{ projectId, isBlockImage: true, blockId: imageData._id }}
          />
        ) : null}
        {isAdmin && !loading ? (
          imageData?.img ? (
            <img src={`${detailImgsPath}/${imageData.img}`} alt={imageData?.imgTitle?.[language]} loading="lazy" />
          ) : (
            imageStatic
          )
        ) : null}
        {!isAdmin && !loading && imageData.img ? (
          <img src={`${detailImgsPath}/${imageData.img}`} alt={imageData?.imgTitle?.[language]} loading="lazy" />
        ) : null}
      </div>
      <div className="image-data">
        <div className="image-title">{imageData?.imgTitle?.[language]}</div>
        <div className="image-description">{imageData?.imgDescription?.[language]}</div>
      </div>
    </div>
  ));

  const backToTop = (
    <div className="back-to-top" onClick={backToTopClick}>
      <ArrowUpShort />
      <span className="back-to-top-text">back to top</span>
    </div>
  );

  const mainImage = (
    <img
      src={`${detailImgsPath}/${projectDetailsObj.detailTitleImage}`}
      alt={projectDetailsObj.projectInfo.title[language]}
      loading="lazy"
    />
  );

  return (
    <Content classNames={'flex-child'}>
      <div className="project-details">
        <div className="main-image">
          {isAdmin && !loading ? (
            <DetailEditTool editModalClick={editTitleImage} deleteData={{ projectId, isBlockImage: false }} />
          ) : null}
          {isAdmin && !loading ? (detailsMainImageExists ? mainImage : imageStatic) : null}
          {!isAdmin && detailsMainImageExists ? mainImage : null}
        </div>
        <div className="project-info">
          <div className="project-title">
            <h4>{projectDetailsObj.projectInfo.title[language]}</h4>
          </div>
          <div className="project-text">
            <span>{projectDetailsObj.projectInfo.text[language]}</span>
          </div>
          <div className="project-specifications">
            <div className="specification-name">{specificationsNames}</div>
            <div className="specification-value">{specificationsValues}</div>
          </div>

          {isAdmin ? <EditProjectInfoButton editInfo={editInfo} /> : null}
        </div>
        <div className="images">{images}</div>
        {isAdmin ? <AddImageBlock addImageBlock={addImageBlock} /> : null}

        {showToTopButton ? backToTop : null}
      </div>
    </Content>
  );
};

export default FullWidthTemplate;
