import { delay, put } from 'redux-saga/effects';
import * as actions from '../actions';

export function* fetchProjectsSaga({page_size, page_num}) {
  try {
    yield put(actions.fetchProjectsLoading());
    
    const resp = yield fetch(`http://localhost:5000/api/projects?page_size=${page_size}&page_num=${page_num}`);
    // const resp = yield fetch('http://192.168.2.116:5000/api/projects/');
    const respJson = yield resp.json();
    yield put(actions.fetchProjectsSuccess(respJson.projects));
  
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* fetchMainPageProjectsSaga() {
  try {
    const resp = yield fetch('http://localhost:5000/api/projects?mainPage=true');
    // const resp = yield fetch('http://192.168.2.116:5000/api/projects/');
    const respJson = yield resp.json();
    yield put(actions.fetchMainPageProjectsSuccess(respJson.projects));
  
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* fetchRandomProjectSaga() {
  try {
    yield put(actions.fetchProjectsLoading());

    const resp = yield fetch('http://localhost:5000/api/projects/random');
    
    const respJson = yield resp.json();
    yield put(actions.fetchRandomProjectSuccess(respJson.projects));
  
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* fetchProjectByIdSaga({id}) {
  try {
    yield put(actions.fetchProjectsLoading());

    const resp = yield fetch(`http://localhost:5000/api/projects/show/${id}`);

    yield delay(5000);
    
    const respJson = yield resp.json();
    yield put(actions.fetchProjectsSuccess(respJson.projects));

  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}