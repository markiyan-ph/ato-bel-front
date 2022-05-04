import { updateObject } from '../../tools/helpers';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  projectsList: [],
  mainPageProjects: [],
  pages: 1,
  lastPage: 0,
  error: false,
  loading: false
};

const fetchProjectsSuccess = (state, action) => {
  const mergedList = [...state.projectsList, ...action.projects.projectsList];
  
  return updateObject(state, {
    projectsList: [...new Map(mergedList.map(project => [project._id, project])).values()],
    pages: action.projects.pages,
    lastPage: action.projects.lastPage,
    loading: false,
    error: false
  });
};

const fetchProjectsLoading = (state) => {
  return updateObject(state, {
    loading: true,
    error: false
  });
};

const fetchRandomProjectSuccess = (state, action) => {
  return updateObject(state, {
    mainPageProjects: [...action.projects.projectsList],
    loading: false,
    error: false
  });
};

const fetchMainPageProjectSuccess = (state, action) => {
  return updateObject(state, {
    mainPageProjects: [...action.projects.projectsList],
    loading: false,
    error: false
  });
};

const fetchRandomProjectFail = (state, action) => {
  return updateObject(state, {
    projectsList: [...action.projects.projectsList],
    loading: false,
    error: true
  });
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state, action);
    case actionTypes.FETCH_MAIN_PAGE_PROJECTS_SUCCESS: return fetchMainPageProjectSuccess(state, action);
    case actionTypes.FETCH_RANDOM_PROJECT_SUCCESS: return fetchRandomProjectSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_FAIL: return fetchRandomProjectFail(state, action);
    case actionTypes.FETCH_PROJECTS_LOADING: return fetchProjectsLoading(state);
    default:
      return state;
  }
};

export default projectsReducer;