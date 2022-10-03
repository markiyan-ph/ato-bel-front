import * as actionTypes from "./actionTypes";

export const fetchProjects = (page_size, page_num) => ({ type: actionTypes.FETCH_PROJECTS, page_size, page_num });
export const fetchMainPageProjects = () => ({ type: actionTypes.FETCH_MAIN_PAGE_PROJECTS });
export const fetchProjectsLoading = () => ({ type: actionTypes.FETCH_PROJECTS_LOADING });

export const fetchProjectsSuccess = projects => ({
  type: actionTypes.FETCH_PROJECTS_SUCCESS,
  projects: projects,
});

export const fetchMainPageProjectsSuccess = projects => ({
  type: actionTypes.FETCH_MAIN_PAGE_PROJECTS_SUCCESS,
  projects: projects,
});

export const fetchProjectsFail = () => ({
  type: actionTypes.FETCH_PROJECTS_FAIL,
  projects: [],
  error: true

});

export const addProject = formData => ({type: actionTypes.ADD_PROJECT, formData});
export const addProjectSuccess = project => ({type: actionTypes.ADD_PROJECT_SUCCESS, project});

export const deleteProject = projectId => ({type: actionTypes.DELETE_PROJECT, projectId});
export const deleteProjectSuccess = ({projectId}) => ({type: actionTypes.DELETE_PROJECT_SUCCESS, projectId});
