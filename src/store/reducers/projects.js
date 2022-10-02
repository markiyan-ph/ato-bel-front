import { updateObject } from '../../tools/helpers';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  projectsList: [],
  mainPageProjects: [],
  pages: 1,
  lastPage: 0,
  error: false,
  loading: false,
};

const fetchProjectsSuccess = (state, action) => {
  const mergedList = [...state.projectsList, ...action.projects.projectsList];

  return updateObject(state, {
    projectsList: [...new Map(mergedList.map(project => [project._id, project])).values()],
    pages: action.projects.pages,
    lastPage: action.projects.lastPage,
    loading: false,
    error: false,
  });
};

const fetchProjectsLoading = state => {
  return updateObject(state, {
    loading: true,
    error: false,
  });
};

const fetchMainPageProjectSuccess = (state, action) => {
  return updateObject(state, {
    mainPageProjects: [...action.projects.projectsList],
    loading: false,
    error: false,
  });
};

const fetchProjectFail = state => {
  return updateObject(state, {
    loading: false,
    error: true,
  });
};

const addProject = state => {
  return updateObject(state, { loading: true });
};

const addProjectSuccess = (state, action) => {
  const mergedList = [...state.projectsList, action.project];
  return updateObject(state, { projectsList: mergedList, loading: false });
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return fetchProjectsSuccess(state, action);
    case actionTypes.FETCH_MAIN_PAGE_PROJECTS_SUCCESS:
      return fetchMainPageProjectSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_FAIL:
      return fetchProjectFail(state);
    case actionTypes.FETCH_PROJECTS_LOADING:
      return fetchProjectsLoading(state);
    case actionTypes.ADD_PROJECT:
      return addProject(state);
    case actionTypes.ADD_PROJECT_SUCCESS:
      return addProjectSuccess(state, action);
    default:
      return state;
  }
};

export default projectsReducer;
