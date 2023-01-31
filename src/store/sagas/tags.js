import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import { postJson } from '../../tools';

const SERVER_API = `/api`;

export function* fetchTagsSaga() {
  try {
    const resp = yield fetch(`${SERVER_API}/tags`);
    const respJson = yield resp.json();
    yield put(actions.fetchTagsSuccess(respJson));
  
  } catch (err) {
    console.log(err);
    yield put(actions.saveTagFail());
  }
}

export function* saveTagSaga({tag}) {
  try {
    const resp = yield postJson(`${SERVER_API}/tags/save`, tag);
    const respJson = yield resp.json();
    yield put(actions.saveTagSuccess(respJson));
  
  } catch (err) {
    console.log(err);
    yield put(actions.saveTagFail());
  }
}

export function* updateTagSaga({tag}) {
  try {
    console.log('tag update', tag);
    const resp = yield postJson(`${SERVER_API}/tags/update`, tag);
    const respJson = yield resp.json();
    console.log(respJson);
    yield put(actions.updateTagSuccess(respJson));
  
  } catch (err) {
    console.log(err);
    yield put(actions.saveTagFail());
  }
}

export function* deleteTagSaga({tagId}) {
  try {
    const resp = yield postJson(`${SERVER_API}/tags/delete`, {tagId});
    const respJson = yield resp.json();
    yield put(actions.deleteTagSuccess(respJson));
  
  } catch (err) {
    console.log(err);
    yield put(actions.deleteTagFail());
  }
}