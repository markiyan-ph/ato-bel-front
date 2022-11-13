import * as actionTypes from "./actionTypes";

export const projectDetailsLoading = () => ({ type: actionTypes.PROJECT_DETAILS_LOADING });

export const updateProjectDetails = (projectId, details) => ({ type: actionTypes.UPDATE_PROJECT_DETAILS, projectId, details });
export const updateProjectDetailsImage = (formData, data) => ({ type: actionTypes.UPDATE_PROJECT_DETAILS_IMAGE, formData, data });
export const updateProjectDetailsSuccess = (projectId, details) => ({ type: actionTypes.UPDATE_PROJECT_DETAILS_SUCCESS, projectId, details });

export const fetchProjectDetails = (projectId) => ({ type: actionTypes.FETCH_PROJECT_DETAILS, projectId });
export const fetchProjectDetailsSuccess = (projectId, details) => ({
  type: actionTypes.FETCH_PROJECT_DETAILS_SUCCESS,
  projectId,
  details
});
