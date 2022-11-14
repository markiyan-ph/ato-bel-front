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
  const [showProjectInfoUpdateForm, popupProjectInfoUpdate] = useState(false);
  const projectDetails = useSelector(state => state.projectDetails);
  const { isAdmin, isAuthorized } = useSelector(state => state.authorization);

  const openProjectInfoUpdate = () => popupProjectInfoUpdate(true);
  const closeProjectInfoUpdate = () => popupProjectInfoUpdate(false);

  const fetchProjectDetails = projectId => {
    dispatch(actions.fetchProjectDetails(projectId));
  };

  const showControls = isAdmin && isAuthorized;
  const updateProjectForm = <DetailsProjectInfoForm projectId={projectId} showForm={popupProjectInfoUpdate} />;

  useEffect(() => {
    fetchProjectDetails(projectId);
  }, [projectId]);

  // return <FullWidthTemplate projectDetailsObj={projectDetailsObj} />;
  return (
    <div className="project-detail-wrapper">
      <ModalForm
        show={showProjectInfoUpdateForm}
        modalClose={closeProjectInfoUpdate}
        form={updateProjectForm}
        formTitle="Update project data"
      />
      <FullWidthTemplate
        projectId={projectId}
        projectDetailsObj={projectDetails.details}
        isAdmin={showControls}
        language={lang}
        editInfo={openProjectInfoUpdate}
        loading={projectDetails.loading}
      />
    </div>
  );
};

export default ProjectsDetails;
