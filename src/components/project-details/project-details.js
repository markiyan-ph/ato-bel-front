import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as actions from '../../store/actions';
import { FullWidthTemplate } from './templates';

const ProjectsDetails = () => {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const projectDetails = useSelector(state => state.projectDetails);
  const {isAdmin, isAuthorized} = useSelector(state => state.authorization);
  // const {isAdmin, isAuthorized} = useSelector(state => state.authorization);

  console.log(projectDetails);

  const fetchProjectDetails = (projectId) => {
    dispatch(actions.fetchProjectDetails(projectId));
  };

  const showControls = isAdmin && isAuthorized;

  useEffect(() => {
    fetchProjectDetails(projectId);
  }, [projectId]);

  // return <FullWidthTemplate projectDetailsObj={projectDetailsObj} />;
  return <FullWidthTemplate projectId={projectId} projectDetailsObj={projectDetails.details} isAdmin={showControls} language={lang} />;
};

export default ProjectsDetails;
