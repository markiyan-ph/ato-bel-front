import React from 'react';
import { ArrowUpShort } from 'react-bootstrap-icons';

import Content from '../../content';
import './full-width.scss';

const FullWidthTemplate = ({projectDetailsObj}) => {
  const backToTopClick = (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  const specificationsNames = projectDetailsObj.projectInfo.specifications.map(specification => (
    <div key={specification._id+'name'}>
      {specification.name}
    </div>
  ));
  
  const specificationsValues = projectDetailsObj.projectInfo.specifications.map(specification => (
    <div key={specification._id+'value'}>
      {specification.value}
    </div>
  ));

  const images = projectDetailsObj.images.map(imageData => (
    <div className="image-data-container" key={imageData._id}>
      <div className="image">
        <img src={imageData.img} alt={imageData.imgTitle} />
      </div>
      <div className="image-data">
        <div className="image-title">{imageData.imgTitle}</div>
        <div className="image-description">{imageData.imgDescription}</div>
      </div>
    </div>
  ));

  return (
    <Content classNames={'flex-child'}>
      <div className="project-details">
        <div className="main-image">
          <img src={projectDetailsObj.detailMainImage} alt={projectDetailsObj.projectInfo.title} />
        </div>
        <div className="project-info">
          <div className="project-title">
            <h4>{projectDetailsObj.projectInfo.title}</h4>
          </div>
          <div className="project-text">
            <span>{projectDetailsObj.projectInfo.text}</span>
          </div>
          <div className="project-specifications">
            <div className="specification-name">{specificationsNames}</div>
            <div className="specification-value">{specificationsValues}</div>
          </div>
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
