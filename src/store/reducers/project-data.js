import { updateObject } from "../../tools/helpers";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  projectId: "",
  data: "",
  error: false,
  loading: true
};

const fetchProjectDetailsSuccess = (state, action) => {
  return updateObject(state, {
    projectId: action.projectId,
    data: action.data,
    loading: false,
    error: false
  });
};

const projectDetailsLoading = (state) => {
  return updateObject(state, {
    loading: true,
    error: false,
  });
};

const saveProjectDetailsSuccess = (state, action) => {
  return updateObject(state, {
    projectId: action.projectId,
    data: action.data,
    loading: false,
    error: false
  });
};

const projectDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT_DETAILS_SUCCESS:
      return fetchProjectDetailsSuccess(state, action);
    case actionTypes.PROJECT_DETAILS_LOADING:
      return projectDetailsLoading(state);
    case actionTypes.SAVE_PROJECT_DETAILS_SUCCESS:
      return saveProjectDetailsSuccess(state, action);
    //   case actionTypes.FETCH_RANDOM_PROJECT_SUCCESS: return fetchRandomProjectSuccess(state, action);
    //   case actionTypes.FETCH_PROJECTS_FAIL: return fetchRandomProjectFail(state, action);
    default:
      return state;
  }
};

export default projectDataReducer;
