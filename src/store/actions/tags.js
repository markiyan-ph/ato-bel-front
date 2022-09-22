import * as actionTypes from "./actionTypes";

// export const fetchProjects = (page_size, page_num) => ({ type: actionTypes.FETCH_PROJECTS, page_size, page_num });

// export const fetchProjectById = (id) => ({ type: actionTypes.FETCH_PROJECT_BY_ID, id });

export const fetchTags = () => ({ type: actionTypes.FETCH_TAGS });

export const fetchTagsSuccess = tags => ({
  type: actionTypes.FETCH_TAGS_SUCCESS,
  tags
});

export const fetchTagsFail = () => ({
  type: actionTypes.FETCH_TAGS_FAIL,
});

export const saveTag = tag => ({
  type: actionTypes.SAVE_TAGS,
  tag
});

export const saveTagSuccess = tag => ({
  type: actionTypes.SAVE_TAGS_SUCCESS,
  tag
});

export const saveTagFail = tag => ({
  type: actionTypes.SAVE_TAGS_FAIL,
  tag
});

export const deleteTag = tagId => ({
  type: actionTypes.DELETE_TAG,
  tagId
});

export const deleteTagSuccess = ({tagId}) => ({
  type: actionTypes.DELETE_TAG_SUCCESS,
  tagId
});

export const deleteTagFail = () => ({
  type: actionTypes.DELETE_TAG_FAIL
});

export const updateTag = tag => ({
  type: actionTypes.UPDATE_TAGS,
  tag
});

export const updateTagSuccess = tag => ({
  type: actionTypes.UPDATE_TAGS_SUCCESS,
  tag
});