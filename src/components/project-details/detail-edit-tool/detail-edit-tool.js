import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { Trash, Pencil } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';
import ConfirmationForm from '../../modal-forms/confirmation-form';

import './detail-edit-tool.scss';

const DetailEditTool = ({ editModalClick, deleteData }) => {
  // const {i18n} = useTranslation();
  // const lang = i18n.language;
  const dispatch = useDispatch();
  const [showDeleteConfirmation, popupDeleteConfirmation] = useState(false);
  const openConfirmation = () => popupDeleteConfirmation(true);
  const closeConfirmation = () => popupDeleteConfirmation(false);

  const editClick = e => {
    e.stopPropagation();
    e.preventDefault();
    editModalClick();
  };

  const deleteAction = (projectId, isBlockImage, blockId) =>
    dispatch(actions.deleteProjectDetailsImage(projectId, isBlockImage, blockId));
  
  const deleteClick = e => {
    e.stopPropagation();
    e.preventDefault();
    console.log('--- Delete project details ---');
    console.log('Delete data', deleteData);
    openConfirmation();
  };

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
              confirmAction={deleteAction}
              actionParams={[deleteData.projectId, deleteData.isBlockImage, deleteData.blockId]}
            />
          </div>
          <Trash />
        </div>
      </div>
    </div>
  );
};

export default DetailEditTool;
