import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import { getServerAPI } from '../../tools/helpers';

const SERVER_API = `${getServerAPI()}/api`;

export function* fetchProjectsSaga({page_size, page_num}) {
  try {
    yield put(actions.fetchProjectsLoading());
    
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
    const resp = yield fetch(`${SERVER_API}/projects/add`, {
      method: 'post',
      body: formData
    });
    const respJson = yield resp.json();
    yield put(actions.addProjectSuccess(respJson));
  
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}