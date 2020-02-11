import { put } from 'redux-saga/effects';
import * as actions from '../actions';

export function* fetchProjectsSaga() {
  try {
    const resp = yield fetch('http://localhost:5000/api/projects/');
    // const resp = yield fetch('http://192.168.2.116:5000/api/projects/');
    const respJson = yield resp.json();
    yield put(actions.fetchProjectsSuccess(respJson.projects));
  
  } catch (err) {
    console.log(err);
  }
}

export function* fetchRandomProjectSaga() {
  try {
    const resp = yield fetch('http://localhost:5000/api/projects/random');
    // const resp = yield fetch('http://192.168.2.116:5000/api/projects/random');
    const respJson = yield resp.json();
    yield put(actions.fetchRandomProjectSuccess(respJson.projects));
  
  } catch (err) {
    console.log(err);
  }
}
