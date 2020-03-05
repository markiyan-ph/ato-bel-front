import React from 'react';

import './content.scss';

const Content = ({children, classNames}) => {
  return (
    <div className={`content ${classNames}`}>
      {children}
    </div>
  );
};

export default Content;