import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { fetchProjectsSaga, fetchRandomProjectSaga } from './projects';

export function* watchProjects() {
  yield takeEvery(actionTypes.FETCH_PROJECTS, fetchProjectsSaga);
  yield takeEvery(actionTypes.FETCH_RANDOM_PROJECT, fetchRandomProjectSaga);
}