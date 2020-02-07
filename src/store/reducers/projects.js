import { updateObject } from '../../tools/helpers';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  projectsList: [],
  error: false,
  loading: true
};

const fetchProjectsSuccess = (state, action) => {
  console.log(updateObject(state, { projectsList: [...action.projects], loading: false }));
  return updateObject(state, {
    projectsList: [...action.projects],
    loading: false
  });
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state, action);
    default:
      return state;
  }
};

export default projectsReducer;