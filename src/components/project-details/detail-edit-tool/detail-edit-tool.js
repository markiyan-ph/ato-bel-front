import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { Trash, Pencil } from 'react-bootstrap-icons';
// import { useDispatch } from 'react-redux';
// import { ModalForm, UpdateProjectForm, AddToMainPageForm } from '../../modal-forms';
// import * as actions from '../../../store/actions';
import ConfirmationForm from '../../modal-forms/confirmation-form';

import './detail-edit-tool.scss';

const DetailEditTool = ({ editModalClick, deleteData }) => {
  // const {i18n} = useTranslation();
  // const lang = i18n.language;
  // const dispatch = useDispatch();
  // const [showUpdateForm, popupUpdate] = useState(false);
  // const [showMainPageImageForm, popupMainPageImage] = useState(false);
  const [showDeleteConfirmation, popupDeleteConfirmation] = useState(false);
  // const openUpdate = () => popupUpdate(true);
  // const closeUpdate = () => popupUpdate(false);
  // const openMainPageImage = () => popupMainPageImage(true);
  // const closeMainPageImage = () => popupMainPageImage(false);
  const openConfirmation = () => popupDeleteConfirmation(true);
  const closeConfirmation = () => popupDeleteConfirmation(false);

  // const deleteProject = projectId => dispatch(actions.deleteProject(projectId));

  // const updateProjectForm = <UpdateProjectForm showModal={popupUpdate} projectId={projectId} />;
  // const updateMainPageProjectForm = <AddToMainPageForm showModal={popupMainPageImage} projectId={projectId} />;

  const editClick = e => {
    e.stopPropagation();
    e.preventDefault();
    editModalClick();

    // if (imageBlock) {
    //   editModalClick({modalState: true, elementIndex});
    // } else {
    //   editModalClick();
    // }
  };

  // const mainPageClick = e => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   console.log('+++ Add project to main page +++');
  //   openMainPageImage();
  // };

  const deleteAction = (projectId, isBlockImage, blockId) => {
    if (isBlockImage) {
      console.log('isBlockImage ', isBlockImage);
      console.log('blockId: ', blockId);
    } else {
      console.log('isBlockImage ', isBlockImage);
      console.log('blockId: ', blockId);
    }
  };
  
  const deleteClick = e => {
    e.stopPropagation();
    e.preventDefault();
    console.log('--- Delete project details ---');
    console.log('Delete data', deleteData);
    const {projectId, isBlockImage, blockId=''} = deleteData;
    deleteAction(projectId, isBlockImage, blockId);
    openConfirmation();
  };

  // confirmAction={deleteProject}
  // actionParams={[projectId]}
  return (
    <div className="detail-edit-tools-wrapper">
      <div className="edit-tools">
        <div className="edit" onClick={e => editClick(e)}>
          <Pencil />
        </div>
        <div className="delete" onClick={e => deleteClick(e)}>
          <div onClick={e => e.stopPropagation()}>
            <ConfirmationForm
              show={showDeleteConfirmation}
              close={closeConfirmation}
              title="Delete block"
              bodyText="Are you sure you want delete current block of information?"
              confirmAction={(text) => {console.log(text)}}
              actionParams={['it works and that is great']}
            />
          </div>
          <Trash />
        </div>
      </div>
    </div>
  );
};

export default DetailEditTool;
