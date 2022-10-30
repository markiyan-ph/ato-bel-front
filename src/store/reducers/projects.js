import { updateObject, updateDeleteListItem } from '../../tools/helpers';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  projectsList: [],
  mainPageProjects: [],
  pages: 1,
  lastPage: 0,
  error: false,
  loading: false,
};

const projectsLoading = state => {
  return updateObject(state, { loading: true, error: false });
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

const addProjectSuccess = (state, action) => {
  const mergedList = [action.project, ...state.projectsList].sort((a,b) => (a.date > b.date ? -1 : 1));
  return updateObject(state, { projectsList: mergedList, loading: false });
};

const updateProjectSuccess = (state, action) => {
  const {projectsList} = state;
  const projectIndex = projectsList.findIndex(p => p._id === action.project._id);
  const updatedList = updateDeleteListItem(projectsList, projectIndex, action.project)?.sort((a,b) => (a.date > b.date ? -1 : 1));
  return updateObject(state, { projectsList: updatedList, loading: false });
};

const addMainPageImageSuccess = (state) => {
  return updateObject(state, {loading: false});
};

const deleteProjectSuccess = (state, action) => {
  const {projectsList} = state;
  const projectIndex = projectsList.findIndex(p => p._id === action.projectId);
  const newProjectList = updateDeleteListItem(projectsList, projectIndex);
  return updateObject(state, { projectsList: newProjectList, loading: false });
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS:
      return projectsLoading(state);
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return fetchProjectsSuccess(state, action);
    case actionTypes.FETCH_MAIN_PAGE_PROJECTS_SUCCESS:
      return fetchMainPageProjectSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_FAIL:
      return fetchProjectFail(state);
    // case actionTypes.FETCH_PROJECTS_LOADING:
    //   return fetchProjectsLoading(state);
    case actionTypes.ADD_PROJECT:
      return projectsLoading(state);
    case actionTypes.ADD_PROJECT_SUCCESS:
      return addProjectSuccess(state, action);
    case actionTypes.DELETE_PROJECT:
      return projectsLoading(state);
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return deleteProjectSuccess(state, action);
    case actionTypes.UPDATE_PROJECT:
      return projectsLoading(state);
    case actionTypes.UPDATE_PROJECT_SUCCESS:
      return updateProjectSuccess(state, action);
    case actionTypes.ADD_MAIN_PAGE_PROJECT_IMAGE:
      return projectsLoading(state);
    case actionTypes.ADD_MAIN_PAGE_PROJECT_IMAGE_SUCCESS:
      return addMainPageImageSuccess(state);
    default:
      return state;
  }
};

export default projectsReducer;
