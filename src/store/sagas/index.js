import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { fetchProjectDetailsSaga, saveProjectDetailsSaga } from './project-data';
import { fetchMainPageProjectsSaga, fetchProjectsSaga, addProjectSaga, deleteProjectSaga } from './projects';
import { saveTagSaga, deleteTagSaga, fetchTagsSaga, updateTagSaga } from './tags';

export function* watchProjects() {
  yield takeEvery(actionTypes.FETCH_PROJECTS, fetchProjectsSaga);
  yield takeEvery(actionTypes.FETCH_MAIN_PAGE_PROJECTS, fetchMainPageProjectsSaga);
  yield takeEvery(actionTypes.FETCH_PROJECT_DETAILS, fetchProjectDetailsSaga);
  yield takeEvery(actionTypes.SAVE_PROJECT_DETAILS, saveProjectDetailsSaga);
  yield takeEvery(actionTypes.ADD_PROJECT, addProjectSaga);
  yield takeEvery(actionTypes.DELETE_PROJECT, deleteProjectSaga);
  yield takeEvery(actionTypes.FETCH_TAGS, fetchTagsSaga);
  yield takeEvery(actionTypes.SAVE_TAGS, saveTagSaga);
  yield takeEvery(actionTypes.UPDATE_TAGS, updateTagSaga);
  yield takeEvery(actionTypes.DELETE_TAG, deleteTagSaga);
}
