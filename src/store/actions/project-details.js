import * as actionTypes from "./actionTypes";

export const projectDetailsLoading = () => ({ type: actionTypes.PROJECT_DETAILS_LOADING });

export const updateProjectDetails = (projectId, data) => ({ type: actionTypes.UPDATE_PROJECT_DETAILS, projectId, data });
export const updateProjectDetailsSuccess = (projectId, data) => ({ type: actionTypes.UPDATE_PROJECT_DETAILS_SUCCESS, projectId, data });

export const fetchProjectDetails = (projectId) => ({ type: actionTypes.FETCH_PROJECT_DETAILS, projectId });
export const fetchProjectDetailsSuccess = (projectId, data) => ({
  type: actionTypes.FETCH_PROJECT_DETAILS_SUCCESS,
  projectId,
  data
});
