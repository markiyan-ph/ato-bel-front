import { updateObject } from '../../tools/helpers';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  projectId: null,
  details: {
    detailMainImage: '',
    projectInfo: {
      title: '',
      text: '',
      specifications: [],
    },
    images: []
  },
  error: false,
  loading: false,
};

const fetchProjectDetailsSuccess = (state, action) => {
  console.log(action);
  
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
    data: action.data,
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
