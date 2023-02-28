import { put, select, call } from 'redux-saga/effects';
import * as actions from '../actions';
import { refreshTokenSaga } from './authorization';
import { ErrorCodes, postJson } from '../../tools';
import { getAccessToken } from './';

const SERVER_API = `/api`;

export function* fetchProjectsSaga({ page_size, page_num }) {
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

export function* addProjectSaga({ formData }) {
  try {
    const accessToken = yield select(getAccessToken);
    const resp = yield fetch(`${SERVER_API}/projects/add`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(actions.addProject(formData));
      } else {
        return yield put(actions.fetchProjectsFail());
      }
    }

    return yield put(actions.addProjectSuccess(respJson));
  } catch (err) {
    yield put(actions.fetchProjectsFail());
  }
}

export function* addMainProjectSaga({ formData }) {
  try {
    const accessToken = yield select(getAccessToken);
    const resp = yield fetch(`${SERVER_API}/projects/main/add`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(actions.addMainPageProjectImage(formData));
      } else {
        return yield put(actions.fetchProjectsFail());
      }
    }

    return yield put(actions.addMainPageProjectImageSuccess(respJson));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* deleteMainProjectSaga({ projectId }) {
  try {
    const accessToken = yield select(getAccessToken);
    const resp = yield postJson(`${SERVER_API}/projects/main/delete`, { projectId }, {Authorization: `Bearer ${accessToken}`});
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(actions.deleteMainPageProjectImage(projectId));
      } else if (respJson?.message && respJson?.message === ErrorCodes.MAIN_PAGE_IMAGE_FAIL) {
        return yield put(actions.deleteMainPageProjectImageFail(respJson.message));
      } else {
        return yield put(actions.fetchProjectsFail());
      }
    }

    return yield put(actions.addMainPageProjectImageSuccess(respJson));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* updateProjectSaga({ formData }) {
  try {
    const resp = yield fetch(`${SERVER_API}/projects/update`, {
      method: 'post',
      body: formData,
    });
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(updateProjectSaga(formData));
      } else {
        return yield put(actions.fetchProjectsFail());
      }
    }

    return yield put(actions.updateProjectSuccess(respJson));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* deleteProjectSaga(projectId) {
  try {
    const accessToken = yield select(getAccessToken);
    const resp = yield postJson(`${SERVER_API}/projects/delete`, projectId, { Authorization: `Bearer ${accessToken}` });
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(actions.deleteProject(projectId.projectId));
      } else {
        return yield put(actions.fetchProjectsFail());
      }
    }

    return yield put(actions.deleteProjectSuccess(respJson));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}
