import React from 'react';
import { ArrowUpShort } from 'react-bootstrap-icons';
import DetailEditTool from '../detail-edit-tool';

import Content from '../../content';
import './full-width.scss';
import { Button } from 'react-bootstrap';

const FullWidthTemplate = ({ projectId, projectDetailsObj, language, isAdmin, editInfo }) => {
  const detailImgsPath = `/uploads/${projectId}/detail-imgs`;
  
  const backToTopClick = (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  const specificationsNames = projectDetailsObj.projectInfo.specifications.map(specification => (
    <div key={specification._id+'name'}>
      {specification.name[language]}
    </div>
  ));
  
  const specificationsValues = projectDetailsObj.projectInfo.specifications.map(specification => (
    <div key={specification._id+'value'}>
      {specification.value[language]}
    </div>
  ));

  const images = projectDetailsObj.images.map(imageData => (
    <div className="image-data-container" key={imageData._id}>
      <div className="image">
        {isAdmin ? <DetailEditTool /> : null}
        <img src={`${detailImgsPath}/${imageData.img}` } alt={imageData?.imgTitle?.[language]} loading='lazy' />
      </div>
      <div className="image-data">
        <div className="image-title">{imageData?.imgTitle?.[language]}</div>
        <div className="image-description">{imageData?.imgDescription?.[language]}</div>
      </div>
    </div>
  ));

  const EditProjectInfoButton = () => (
    <div className="edit-project-info-button">
      <Button onClick={editInfo}>Edit</Button>
    </div>
  );

  return (
    <Content classNames={'flex-child'}>
      <div className="project-details">
        <div className="main-image">
          {isAdmin ? <DetailEditTool /> : null}
          <img src={`${detailImgsPath}/${projectDetailsObj.detailMainImage}`} alt={projectDetailsObj.projectInfo.title} loading='lazy' />
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

          {isAdmin ? <EditProjectInfoButton /> : null}
        </div>
        <div className="images">
          {images}
        </div>
        
        <div className='back-to-top' onClick={backToTopClick}><ArrowUpShort /><span className='back-to-top-text'>back to top</span></div>
      </div>
      
    </Content>
  );
};

export default FullWidthTemplate;
