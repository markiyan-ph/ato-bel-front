import React, { useState } from 'react';
import { Trash, Pencil, Image } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { ModalForm, UpdateProjectForm, AddToMainPageForm } from '../../modal-forms';
import * as actions from '../../../store/actions';

import './edit-tool.scss';
import ConfirmationForm from '../../modal-forms/confirmation-form';

const EditTool = ({ projectId }) => {
  const dispatch = useDispatch();
  const [showUpdateForm, popupUpdate] = useState(false);
  const [showMainPageImageForm, popupMainPageImage] = useState(false);
  const [showDeleteConfirmation, popupDeleteConfirmation] = useState(false);
  const openUpdate = () => popupUpdate(true);
  const closeUpdate = () => popupUpdate(false);
  const openMainPageImage = () => popupMainPageImage(true);
  const closeMainPageImage = () => popupMainPageImage(false);
  const openConfirmation = () => popupDeleteConfirmation(true);
  const closeConfirmation = () => popupDeleteConfirmation(false);

  const deleteProject = projectId => dispatch(actions.deleteProject(projectId));

  const updateProjectForm = <UpdateProjectForm showModal={popupUpdate} projectId={projectId} />;
  const updateMainPageProjectForm = <AddToMainPageForm showModal={popupMainPageImage} projectId={projectId} />;

  const editClick = e => {
    e.stopPropagation();
    e.preventDefault();
    console.log('=== Edit project ===');
    openUpdate();
  };

  const mainPageClick = e => {
    e.stopPropagation();
    e.preventDefault();
    console.log('+++ Add project to main page +++');
    openMainPageImage();
  };
  
  const deleteClick = e => {
    e.stopPropagation();
    e.preventDefault();
    console.log('--- Delete project ---');
    openConfirmation();
  };

  return (
    <div className="edit-tools-wrapper">
      <div className="edit-tools">
        <div className="edit" onClick={e => editClick(e)}>
          <div onClick={e => e.stopPropagation()}>
            <ModalForm
              show={showUpdateForm}
              modalClose={closeUpdate}
              form={updateProjectForm}
              formTitle="Update project data"
            />
          </div>
          <Pencil />
        </div>
        <div className="add-main-page" onClick={e => mainPageClick(e)}>
          <div onClick={e => e.stopPropagation()}>
            <ModalForm
              show={showMainPageImageForm}
              modalClose={closeMainPageImage}
              form={updateMainPageProjectForm}
              formTitle="Update project data"
            />
          </div>
          <Image />
        </div>
        <div className="delete" onClick={e => deleteClick(e)}>
          <div onClick={e => e.stopPropagation()}>
            <ConfirmationForm
              show={showDeleteConfirmation}
              close={closeConfirmation}
              title="Project delete"
              bodyText="Are you sure you want delete current project?"
              confirmAction={deleteProject}
              actionParams={[projectId]}
            />
          </div>
          <Trash />
        </div>
      </div>
    </div>
  );
};

export default EditTool;
