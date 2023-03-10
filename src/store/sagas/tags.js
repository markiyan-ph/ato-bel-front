import { call, put, select } from 'redux-saga/effects';
import * as actions from '../actions';
import { ErrorCodes, postJson } from '../../tools';
import { getAccessToken } from '.';
import { refreshTokenSaga } from './authorization';

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

export function* saveTagSaga({ tag }) {
  try {
    const accessToken = yield select(getAccessToken);
    const resp = yield postJson(`${SERVER_API}/tags/save`, tag, { Authorization: `Bearer ${accessToken}` });
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(actions.saveTag(tag));
      } else {
        return yield put(actions.saveTagFail());
      }
    }
    
    yield put(actions.saveTagSuccess(respJson));
  } catch (err) {
    console.log(err);
    yield put(actions.saveTagFail());
  }
}

export function* updateTagSaga({ tag }) {
  try {
    const accessToken = yield select(getAccessToken);
    const resp = yield postJson(`${SERVER_API}/tags/update`, tag, { Authorization: `Bearer ${accessToken}` });
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(actions.updateTag(tag));
      } else {
        return yield put(actions.saveTagFail());
      }
    }
    
    yield put(actions.updateTagSuccess(respJson));
  } catch (err) {
    console.log(err);
    yield put(actions.saveTagFail());
  }
}

export function* deleteTagSaga({ tagId }) {
  try {
    const accessToken = yield select(getAccessToken);
    const resp = yield postJson(`${SERVER_API}/tags/delete`, { tagId }, { Authorization: `Bearer ${accessToken}` });
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(actions.deleteTag(tagId));
      } else {
        return yield put(actions.saveTagFail());
      }
    }
    
    yield put(actions.deleteTagSuccess(respJson));
  } catch (err) {
    console.log(err);
    yield put(actions.deleteTagFail());
  }
}
