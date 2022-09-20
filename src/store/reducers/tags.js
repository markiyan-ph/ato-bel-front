import { updateObject } from '../../tools/helpers';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tags: [],
  error: false
};

const fetchTagsSuccess = (state, action) => {
  return updateObject(state, {tags: [...action.tags]});
};

const fetchTagsFail = (state) => {
  return updateObject(state, {error: true});
};

const saveTagSuccess = (state, action) => {
  const mergedList = [...state.tags, action.tags];

  return updateObject(state, {tags: mergedList});
};

// const unAuthorizeUserSuccess = (state) => {
//   return updateObject(state, {
//     isAuthorized: false, isAdmin: false
//   });
// };

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TAGS_SUCCESS: return fetchTagsSuccess(state, action);
    case actionTypes.FETCH_TAGS_FAIL: return fetchTagsFail(state);
    case actionTypes.SAVE_TAGS_SUCCESS: return saveTagSuccess(state, action);
    default:
      return state;
  }
};

export default tagsReducer;