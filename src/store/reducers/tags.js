import { updateObject, removeItemFromList } from '../../tools/helpers';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tagsList: [],
  error: false,
  loading: false
};

const fetchTags = (state) => {
  return updateObject(state, {loading: true});
};

const fetchTagsSuccess = (state, action) => {
  return updateObject(state, {tagsList: action.tags, loading: false});
};

const fetchTagsFail = (state) => {
  return updateObject(state, {error: true});
};

const saveTagSuccess = (state, action) => {
  const mergedList = [...state.tagsList, action.tag];
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
  
  return updateObject(state, {tagsList: newListOfTags, loading: false});
};

const updateTag = (state) => {
  return updateObject(state, {loading: true});
};

const updateTagSuccess = (state, action) => {
  const { tag } = action;
  const { tagsList } = state;
  const newList = tagsList.slice();
  const updatedElementIndex = newList.findIndex(t => t.tagId === tag.tagId);
  newList[updatedElementIndex] = tag;
  
  return updateObject(state, {tagsList: newList, loading: false});
};

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TAGS: return fetchTags(state);
    case actionTypes.FETCH_TAGS_SUCCESS: return fetchTagsSuccess(state, action);
    case actionTypes.FETCH_TAGS_FAIL: return fetchTagsFail(state);
    case actionTypes.SAVE_TAGS_SUCCESS: return saveTagSuccess(state, action);
    case actionTypes.SAVE_TAGS: return saveTag(state);
    case actionTypes.DELETE_TAG: return deleteTag(state);
    case actionTypes.DELETE_TAG_SUCCESS: return deleteTagSuccess(state, action);
    case actionTypes.UPDATE_TAGS: return updateTag(state);
    case actionTypes.UPDATE_TAGS_SUCCESS: return updateTagSuccess(state, action);
    default:
      return state;
  }
};

export default tagsReducer;