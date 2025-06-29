import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ModalForm, DetailsProjectInfoForm, DetailsTitleImageForm, DetailsImageBlockForm } from '../modal-forms';
import * as actions from '../../store/actions';
import { FullWidthTemplate } from './templates';

const ProjectsDetails = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [showProjectInfoUpdateForm, popupProjectInfoUpdate] = useState(false);
  const [showTitleImageUpdateForm, popupTitleImageUpdate] = useState(false);
  const [showAddImageBlockForm, popupAddImageBlockUpdate] = useState({ modalState: false, elementIndex: null });
  const projectDetails = useSelector(state => state.projectDetails);
  const { isAdmin, isAuthorized } = useSelector(state => state.authorization);

  const openProjectInfoUpdate = useCallback(() => popupProjectInfoUpdate(true));
  const closeProjectInfoUpdate = useCallback(() => popupProjectInfoUpdate(false));
  const openTitleImageUpdate = useCallback(() => popupTitleImageUpdate(true));
  const closeTitleImageUpdate = useCallback(() => popupTitleImageUpdate(false));
  const closeAddImageBlockUpdate = useCallback(() => popupAddImageBlockUpdate({ ...showAddImageBlockForm, modalState: false }));

  const fetchProjectDetails = projectId => {
    dispatch(actions.fetchProjectDetails(projectId));
  };

  const showControls = isAdmin && isAuthorized;
  const updateProjectInfoForm = <DetailsProjectInfoForm projectId={projectId} showForm={popupProjectInfoUpdate} />;
  const updateTitleImageForm = (
    <DetailsTitleImageForm
      projectId={projectId}
      details={projectDetails.details}
      currentImage={
        projectDetails?.details?.detailTitleImage?.length > 0 ? projectDetails.details.detailTitleImage : null
      }
      showModal={popupTitleImageUpdate}
    />
  );
  const updateAddImageBlockForm = (
    <DetailsImageBlockForm
      projectId={projectId}
      details={projectDetails.details}
      blockIndex={showAddImageBlockForm.elementIndex}
      showModal={popupAddImageBlockUpdate}
    />
  );

  useEffect(() => {
    fetchProjectDetails(projectId);
  }, [projectId]);

  // return <FullWidthTemplate projectDetailsObj={projectDetailsObj} />;
  return (
    <div className="project-detail-wrapper">
      <ModalForm
        show={showProjectInfoUpdateForm}
        modalClose={closeProjectInfoUpdate}
        form={updateProjectInfoForm}
        formTitle="Update project data"
      />
      <ModalForm
        show={showTitleImageUpdateForm}
        modalClose={closeTitleImageUpdate}
        form={updateTitleImageForm}
        formTitle="Update image"
      />
      <ModalForm
        show={showAddImageBlockForm.modalState}
        modalClose={closeAddImageBlockUpdate}
        form={updateAddImageBlockForm}
        formTitle="Add/update image block"
      />
      <FullWidthTemplate
        projectId={projectId}
        projectDetailsObj={projectDetails.details}
        isAdmin={showControls}
        language={lang}
        editInfo={openProjectInfoUpdate}
        editTitleImage={openTitleImageUpdate}
        addImageBlock={popupAddImageBlockUpdate}
        loading={isAdmin ? false : projectDetails.loading}
      />
    </div>
  );
};

export default ProjectsDetails;
