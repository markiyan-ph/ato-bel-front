import { updateObject, removeItemFromList } from '../../tools/helpers';
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

const deleteTag = (state) => {
  return updateObject(state, {loading: true});
};

const deleteTagSuccess = (state, action) => {
  const { tagsList } = state;
  const tagIndex = tagsList.findIndex(t => t.tagId === action.tagId);
  const newListOfTags = removeItemFromList(tagsList, tagIndex);
  console.log('newListOfTags', newListOfTags);
  
  return updateObject(state, {tagsList: newListOfTags, loading: false});
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
    case actionTypes.DELETE_TAG: return deleteTag(state);
    case actionTypes.DELETE_TAG_SUCCESS: return deleteTagSuccess(state, action);
    default:
      return state;
  }
};

export default tagsReducer;