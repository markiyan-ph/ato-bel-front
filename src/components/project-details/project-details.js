import React from 'react';
import { ArrowUpShort } from 'react-bootstrap-icons';

import Content from '../content';
import './project-details.scss';

const projectDetailsObj = {
  detailMainImage: 'http://localhost:5005/uploads/63581e7be801e095c85b4d5b/project-main-img/MG_HEADER_1920x587.jpeg',
  projectInfo: {
    title: 'Villa Magnolia',
    text: 'The project is located in Lviv (Ukraine), in the south-eastern district of the city, just 7 km away from the city center. The designed area is part of a mixed-use urban block, that needs both densification and intensification. It is directly adjacent to the major city road from the South and surrounded by now degraded green area of former cooperative gardens from the other sides.',
    specifications: [
      {
        _id: Date.now(),
        name: 'Location',
        value: 'Lviv, Ukraine',
      },
      {
        _id: Date.now(),
        name: 'Year',
        value: '2016',
      },
      {
        _id: Date.now(),
        name: 'Area',
        value: '0,000 m²',
      },
      {
        _id: Date.now(),
        name: 'Client',
        value: 'Vash Dim',
      },
    ],
  },
  images: [
    {
      _id: Date.now(),
      img: 'http://localhost:5005/uploads/63581e7be801e095c85b4d5b/project-img/b051b5b7eb61becdeaae058b1015d412',
      imgTitle: 'Magnolia day light',
      imgDescription:
        'Cupidatat aliquip commodo deserunt minim ad ut veniam eu ipsum fugiat minim. Fugiat do velit magna laboris adipisicing dolor excepteur sunt in do esse consequat. Ullamco cupidatat laborum duis minim nisi adipisicing anim ullamco in ullamco magna sit dolore aliquip. Voluptate nulla ea ex velit proident.',
    },
    {
      _id: Date.now(),
      img: 'http://localhost:5005/uploads/633aeab5b5da11ddf089bbce/project-img/e80ef1e6427656e4a83e847f2f10f349',
      imgTitle: 'Not Magnolia at all',
      imgDescription: '',
    },
  ],
};

console.log(projectDetailsObj);

const ProjectsDetails = () => {
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

export default ProjectsDetails;
