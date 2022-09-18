import React from 'react';
import { Trash, Pencil, Image } from 'react-bootstrap-icons';

import './edit-tool.scss';

const EditTool = () => {
  
  const editClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('=== Edit project ===');
  };

  const mainPageClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('=== Add project to main page ===');
  };
  
  const deleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('=== Delete project ===');
  };
  
  return (
    <div className="edit-tools-wrapper">
      <div className="edit-tools">
        <div className="edit" onClick={(e) => editClick(e)}><Pencil /></div>
        <div className="add-main-page" onClick={(e) => mainPageClick(e)}><Image /></div>
        <div className="delete" onClick={(e) => deleteClick(e)}><Trash /></div>
      </div>
    </div>
  );
};

export default EditTool;