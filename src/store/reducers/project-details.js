import { updateObject } from '../../tools';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  projectId: null,
  details: {
    detailTitleImage: '',
    projectInfo: {
      title: {
        en: '',
        uk: ''
      },
      text: {
        en: '',
        uk: ''
      },
      specifications: [],
    },
    images: []
  },
  error: false,
  loading: true,
};

const fetchProjectDetailsSuccess = (state, action) => {
  if (!action.projectId) {
    return updateObject(initialState, {
      loading: false
    });
  }
  
  return updateObject(state, {
    projectId: action.projectId,
    details: action.details,
    loading: false,
    error: false,
  });
};

const fetchProjectDetailsFail = state => {
  return updateObject(state, {
    loading: false,
    error: true,
  });
};

const projectDetailsLoading = state => {
  return updateObject(state, {
    loading: true,
    error: false,
  });
};

const updateProjectDetailsSuccess = (state, action) => {
  return updateObject(state, {
    projectId: action.projectId,
    details: action.details,
    loading: false,
    error: false,
  });
};

const projectDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT_DETAILS_SUCCESS:
      return fetchProjectDetailsSuccess(state, action);
    case actionTypes.PROJECT_DETAILS_LOADING:
      return projectDetailsLoading(state);
    case actionTypes.UPDATE_PROJECT_DETAILS_SUCCESS:
      return updateProjectDetailsSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_FAIL:
      return fetchProjectDetailsFail(state);
    default:
      return state;
  }
};

export default projectDataReducer;
