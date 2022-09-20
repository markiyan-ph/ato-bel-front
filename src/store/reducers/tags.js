import { updateObject } from '../../tools/helpers';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tagsList: [],
  error: false,
  loading: false
};

const fetchTagsSuccess = (state, action) => {
  return updateObject(state, {tagsList: [...action.tags]});
};

const fetchTagsFail = (state) => {
  return updateObject(state, {error: true});
};

const saveTagSuccess = (state, action) => {
  const mergedList = [...state.tagsList, {...action.tag}];
  return updateObject(state, {tagsList: mergedList, loading: false});
};

const saveTag = (state) => {
  return updateObject(state, {loading: true});
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
    case actionTypes.SAVE_TAGS: return saveTag(state);
    default:
      return state;
  }
};

export default tagsReducer;