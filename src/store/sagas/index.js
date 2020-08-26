import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { fetchProjectsSaga, fetchRandomProjectSaga, fetchMainPageProjectsSaga, fetchProjectByIdSaga } from './projects';

export function* watchProjects() {
  yield takeEvery(actionTypes.FETCH_PROJECTS, fetchProjectsSaga);
  yield takeEvery(actionTypes.FETCH_PROJECT_BY_ID, fetchProjectByIdSaga);
  yield takeEvery(actionTypes.FETCH_MAIN_PAGE_PROJECTS, fetchMainPageProjectsSaga);
  yield takeEvery(actionTypes.FETCH_RANDOM_PROJECT, fetchRandomProjectSaga);
}