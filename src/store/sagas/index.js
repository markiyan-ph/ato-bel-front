import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { fetchProjectsSaga } from './projects';

export function* watchProjects() {
  yield takeEvery(actionTypes.FETCH_PROJECTS, fetchProjectsSaga);
}