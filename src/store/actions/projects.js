import * as actionTypes from "./actionTypes";

export const fetchProjects = () => ({ type: actionTypes.FETCH_PROJECTS });

export const fetchProjectsSuccess = projects => ({
  type: actionTypes.FETCH_PROJECTS_SUCCESS,
  projects: projects
});

export const fetchRandomProject = () => ({ type: actionTypes.FETCH_RANDOM_PROJECT });

export const fetchRandomProjectSuccess = projects => ({
  type: actionTypes.FETCH_RANDOM_PROJECT_SUCCESS,
  projects: projects
});