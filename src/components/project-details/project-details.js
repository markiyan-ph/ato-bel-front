import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ModalForm, DetailsProjectInfoForm } from '../modal-forms';
import * as actions from '../../store/actions';
import { FullWidthTemplate } from './templates';

const ProjectsDetails = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [showUpdateForm, popupUpdate] = useState(false);
  const projectDetails = useSelector(state => state.projectDetails);
  const { isAdmin, isAuthorized } = useSelector(state => state.authorization);

  const openUpdate = () => popupUpdate(true);
  const closeUpdate = () => popupUpdate(false);

  const fetchProjectDetails = projectId => {
    dispatch(actions.fetchProjectDetails(projectId));
  };

  const showControls = isAdmin && isAuthorized;
  const updateProjectForm = <DetailsProjectInfoForm projectId={projectId} />;

  useEffect(() => {
    fetchProjectDetails(projectId);
  }, [projectId]);

  // return <FullWidthTemplate projectDetailsObj={projectDetailsObj} />;
  return (
    <div className="project-detail-wrapper">
      <ModalForm
        show={showUpdateForm}
        modalClose={closeUpdate}
        form={updateProjectForm}
        formTitle="Update project data"
      />
      <FullWidthTemplate
        projectId={projectId}
        projectDetailsObj={projectDetails.details}
        isAdmin={showControls}
        language={lang}
        editInfo={openUpdate}
      />
    </div>
  );
};

export default ProjectsDetails;
