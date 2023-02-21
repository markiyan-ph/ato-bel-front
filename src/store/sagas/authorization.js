import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import { postJson } from '../../tools';

const SERVER_API = `/api`;

export function* loginSaga({username, password}) {
  try {
    // yield put(actions.fetchProjectsLoading()
    const resp = yield postJson(`${SERVER_API}/auth/login`, {username, password});
    const respJson = yield resp.json();
    
    if (!resp.ok) {
      if (respJson?.message) {
        return yield put(actions.authorizeUserFail(respJson.message));
      }
      return yield put(actions.authorizeUserFail('Unexpected error'));
    }
    
    return yield put(actions.authorizeUserSuccess(respJson.accessToken));
  } catch (err) {
    console.log(err);
    yield put(actions.authorizeUserFail('Unexpected error'));
  }
}

export function* refreshTokenSaga() {
  try {
    // yield put(actions.fetchProjectsLoading());
    const resp = yield postJson(`${SERVER_API}/auth/refresh`, {});
    const respJson = yield resp.json();
    
    if (!resp.ok) {
      return yield put(actions.refreshTokenFail());
    }
    
    return yield put(actions.authorizeUserSuccess(respJson.accessToken));
  } catch (err) {
    console.log(err);
    yield put(actions.refreshTokenFail());
  }
}

export function* logoutSaga() {
  try {
    // yield put(actions.fetchProjectsLoading());
    const resp = yield postJson(`${SERVER_API}/auth/logout`, {});
    const respJson = yield resp.json();
    
    if (!resp.ok) {
      if (respJson?.message) {
        return yield put(actions.authorizeUserFail(respJson.message));
      }
      return yield put(actions.authorizeUserFail('Unexpected error'));
    }
    
    return yield put(actions.unAuthorizeUserSuccess());
  } catch (err) {
    console.log(err);
    yield put(actions.authorizeUserFail('Unexpected error'));
  }
}