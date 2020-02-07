import * as actionTypes from "./actionTypes";

export const fetchProjects = () => ({ type: actionTypes.FETCH_PROJECTS });

export const fetchProjectsSuccess = projects => ({
  type: actionTypes.FETCH_PROJECTS_SUCCESS,
  projects: projects
});
