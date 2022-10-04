import React, {useState} from 'react';
import { Trash, Pencil, Image } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { ModalForm, UpdateProjectForm } from '../../modal-forms';
import * as actions from '../../../store/actions';

import './edit-tool.scss';

const EditTool = ({ projectId }) => {
  const dispatch = useDispatch();
  const [showUpdateForm, popupUpdate] = useState(false);
  const openUpdate = () => popupUpdate(true);
  const closeUpdate = () => popupUpdate(false);

  const deleteProject = projectId => dispatch(actions.deleteProject(projectId));

  const updateProjectForm = <UpdateProjectForm showModal={popupUpdate} projectId={projectId} />;
  
  const editClick = e => {
    e.stopPropagation();
    e.preventDefault();
    console.log('=== Edit project ===');
    openUpdate();
  };

  const mainPageClick = e => {
    e.stopPropagation();
    e.preventDefault();
    console.log('=== Add project to main page ===');
  };

  const deleteClick = e => {
    e.stopPropagation();
    e.preventDefault();
    deleteProject(projectId);
  };

  return (
    <div className="edit-tools-wrapper">
      <div onClick={e => e.stopPropagation()}>
        <ModalForm show={showUpdateForm} modalClose={closeUpdate} form={updateProjectForm} formTitle="Update project data" />
      </div>
      <div className="edit-tools">
        <div className="edit" onClick={e => editClick(e)}>
          <Pencil />
        </div>
        <div className="add-main-page" onClick={e => mainPageClick(e)}>
          <Image />
        </div>
        <div className="delete" onClick={e => deleteClick(e)}>
          <Trash />
        </div>
      </div>
    </div>
  );
};

export default EditTool;