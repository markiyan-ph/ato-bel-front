import React from 'react';
import { Tags } from 'react-bootstrap-icons';

import './edit-panel.scss';

const EditPanel = ({openForm}) => {
  return (
    <div className="edit-panel">
      <div className="tags" onClick={() => openForm()}><Tags /></div>
    </div>
  );
};

export default EditPanel;