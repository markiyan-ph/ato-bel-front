import * as actionTypes from "./actionTypes";

export const fetchProjects = (page_size, page_num) => ({ type: actionTypes.FETCH_PROJECTS, page_size, page_num });

// export const fetchProjectById = (id) => ({ type: actionTypes.FETCH_PROJECT_BY_ID, id });

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
