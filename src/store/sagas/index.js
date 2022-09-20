import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { fetchProjectDetailsSaga, saveProjectDetailsSaga } from './project-data';
import { fetchMainPageProjectsSaga, fetchProjectsSaga } from './projects';
import { saveTagSaga } from './tags';

export function* watchProjects() {
  yield takeEvery(actionTypes.FETCH_PROJECTS, fetchProjectsSaga);
  yield takeEvery(actionTypes.FETCH_MAIN_PAGE_PROJECTS, fetchMainPageProjectsSaga);
  yield takeEvery(actionTypes.FETCH_PROJECT_DETAILS, fetchProjectDetailsSaga);
  yield takeEvery(actionTypes.SAVE_PROJECT_DETAILS, saveProjectDetailsSaga);
  yield takeEvery(actionTypes.SAVE_TAGS, saveTagSaga);
}