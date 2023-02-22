import { put, select } from 'redux-saga/effects';
import * as actions from '../actions';
import { postJson } from '../../tools';
import { getAccessToken } from './';

const SERVER_API = `/api`;

export function* fetchProjectsSaga({page_size, page_num}) {
  try {
    // yield put(actions.fetchProjectsLoading());
    
    const resp = yield fetch(`${SERVER_API}/projects?page_size=${page_size}&page_num=${page_num}`);
    const respJson = yield resp.json();
    yield put(actions.fetchProjectsSuccess(respJson.projects));
  
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* fetchMainPageProjectsSaga() {
  try {
    const resp = yield fetch(`${SERVER_API}/projects?mainPage=true`);
    const respJson = yield resp.json();
    yield put(actions.fetchMainPageProjectsSuccess(respJson.projects));
  
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* addProjectSaga({formData}) {
  try {
    const accessToken = yield select(getAccessToken);
    const resp = yield fetch(`${SERVER_API}/projects/add`, {
      method: 'post',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const respJson = yield resp.json();
    console.log(respJson);
    yield put(actions.addProjectSuccess(respJson));
  
  } catch (err) {
    console.log(err.message);
    console.log(err.status);
    yield put(actions.fetchProjectsFail());
  }
}

export function* addMainProjectSaga({formData}) {
  try {
    const accessToken = yield select(getAccessToken);
    console.log('accessToken ----> ', accessToken);
    const resp = yield fetch(`${SERVER_API}/projects/main/add`, {
      method: 'post',
      body: formData
    });
    const respJson = yield resp.json();
    yield put(actions.addMainPageProjectImageSuccess(respJson));
  
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* updateProjectSaga({formData}) {
  try {
    const resp = yield fetch(`${SERVER_API}/projects/update`, {
      method: 'post',
      body: formData
    });
    const respJson = yield resp.json();
    yield put(actions.updateProjectSuccess(respJson));
  
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* deleteProjectSaga(projectId) {
  try {
    const resp = yield postJson(`${SERVER_API}/projects/delete`, projectId);
    const respJson = yield resp.json();
    yield put(actions.deleteProjectSuccess(respJson));
  
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}