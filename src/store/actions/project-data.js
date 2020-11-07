import * as actionTypes from "./actionTypes";

export const saveProjectDetails = (projectId) => ({ type: actionTypes.SAVE_PROJECT_DETAILS, projectId });

export const fetchProjectDetails = (projectId) => ({ type: actionTypes.FETCH_PROJECT_DETAILS, projectId });

export const fetchProjectDetailsLoading = () => ({ type: actionTypes.FETCH_PROJECT_DETAILS_LOADING });

export const fetchProjectDetailsSuccess = (projectId, data) => ({
  type: actionTypes.FETCH_PROJECT_DETAILS_SUCCESS,
  projectId,
  data
});