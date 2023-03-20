import { put, select, call } from 'redux-saga/effects';
import * as actions from '../actions';
import { ErrorCodes, postJson } from '../../tools';
import { getAccessToken } from './';

const SERVER_API = `/api`;

export function* loginSaga({ username, password }) {
  try {
    // yield put(actions.fetchProjectsLoading()
    const resp = yield postJson(`${SERVER_API}/auth/login`, { username, password });
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message) {
        return yield put(actions.authorizeUserFail(respJson.message));
      }
      return yield put(actions.authorizeUserFail('Unexpected error'));
    }

    return yield put(actions.authorizeUserSuccess(respJson.accessToken, respJson.csrfToken, respJson.isMainAdmin));
  } catch (err) {
    console.log(err);
    yield put(actions.authorizeUserFail('Unexpected error'));
  }
}

export function* refreshTokenSaga() {
  try {
    // yield put(actions.fetchProjectsLoading());
    const csrfToken = sessionStorage.getItem('csrfToken');
    const resp = yield postJson(`${SERVER_API}/auth/refresh`, { csrfToken });
    const respJson = yield resp.json();

    if (!resp.ok) {
      sessionStorage.clear();
      return yield put(actions.refreshTokenFail());
    }

    return yield put(actions.refreshTokenSuccess(respJson.accessToken, respJson.isMainAdmin));
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
    sessionStorage.clear();

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
export function* addUserSaga({ userData }) {
  try {
    const accessToken = yield select(getAccessToken);
    const resp = yield postJson(`${SERVER_API}/auth/newuser`, userData, { Authorization: `Bearer ${accessToken}` });
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(actions.addUser(userData));
      } else if (respJson?.message) {
        return yield put(actions.usersActionFail(respJson?.message));
      } else {
        yield put(actions.usersActionFail('Unexpected error'));
      }
    }

    return yield put(actions.addUserSuccess(respJson));
  } catch (err) {
    yield put(actions.usersActionFail('Unexpected error'));
  }
}

export function* fetchUsersSaga() {
  try {
    const accessToken = yield select(getAccessToken);
    const resp = yield fetch(`${SERVER_API}/auth/userslist`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(actions.fetchUsers());
      } else if (respJson?.message) {
        return yield put(actions.usersActionFail(respJson?.message));
      } else {
        yield put(actions.usersActionFail('Unexpected error'));
      }
    }

    return yield put(actions.fetchUsersSuccess(respJson));
  } catch (err) {
    yield put(actions.usersActionFail('Unexpected error'));
  }
}
