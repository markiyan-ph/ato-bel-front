import React from 'react';

import { FullWidthTemplate } from './templates';

const projectDetailsObj = {
  detailMainImage: '/uploads/63581e7be801e095c85b4d5b/project-main-img/MG_HEADER_1920x587.jpeg',
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
      img: '/uploads/63581e7be801e095c85b4d5b/project-img/b051b5b7eb61becdeaae058b1015d412',
      imgTitle: 'Magnolia day light',
      imgDescription:
        'Cupidatat aliquip commodo deserunt minim ad ut veniam eu ipsum fugiat minim. Fugiat do velit magna laboris adipisicing dolor excepteur sunt in do esse consequat. Ullamco cupidatat laborum duis minim nisi adipisicing anim ullamco in ullamco magna sit dolore aliquip. Voluptate nulla ea ex velit proident.',
    },
    {
      _id: Date.now(),
      img: '/uploads/633aeab5b5da11ddf089bbce/project-img/e80ef1e6427656e4a83e847f2f10f349',
      imgTitle: 'Not Magnolia at all',
      imgDescription: '',
    },
  ],
};

console.log(projectDetailsObj);

const ProjectsDetails = () => {
  return <FullWidthTemplate projectDetailsObj={projectDetailsObj} />;
};

export default ProjectsDetails;
