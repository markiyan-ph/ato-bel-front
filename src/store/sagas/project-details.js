import { call, put, select } from 'redux-saga/effects';
import { getAccessToken } from '.';
import { ErrorCodes, postJson } from '../../tools';
import * as actions from '../actions';
import { refreshTokenSaga } from './authorization';

const SERVER_API = `/api`;

export function* fetchProjectDetailsSaga({ projectId }) {
  try {
    yield put(actions.projectDetailsLoading());

    const resp = yield fetch(`${SERVER_API}/projects/details/${projectId}`);
    const respJson = yield resp.json();

    yield put(
      actions.fetchProjectDetailsSuccess(
        respJson?.projectDetails?.projectId ? respJson.projectDetails.projectId : null,
        respJson?.projectDetails?.details ? respJson.projectDetails.details : null
      )
    );
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* updateProjectDetailsSaga({ projectId, details }) {
  try {
    const accessToken = yield select(getAccessToken);
    yield put(actions.projectDetailsLoading());

    const reqBody = {
      projectId,
      details,
    };

    const resp = yield postJson(`${SERVER_API}/projects/details/update`, reqBody, { Authorization: `Bearer ${accessToken}` });
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        yield put(actions.updateProjectDetails(projectId, details));
        return;
      } else {
        yield put(actions.fetchProjectsFail());
        return;
      }
    }

    yield put(actions.updateProjectDetailsSuccess(respJson.projectId, respJson.details));
    return;
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* updateProjectDetailsImageSaga({ formData, projectId, details }) {
  try {
    const accessToken = yield select(getAccessToken);
    yield put(actions.projectDetailsLoading());

    const respImgUpdate = yield fetch(`${SERVER_API}/projects/details/update/image`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const respImgUpdateJson = yield respImgUpdate.json();

    if (!respImgUpdate.ok) {
      if (respImgUpdateJson?.message && respImgUpdateJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(actions.updateProjectDetailsImage(formData, projectId, details));
      } else {
        return yield put(actions.fetchProjectsFail());
      }
    }
    
    const newDetails = JSON.parse(JSON.stringify(details));

    if (respImgUpdateJson?.titleImage === true) {
      newDetails.detailTitleImage = respImgUpdateJson.name;
    } else {
      newDetails.images[respImgUpdateJson.imgIndex].img = respImgUpdateJson.name;
    }

    const reqBody = {
      projectId,
      details: newDetails,
    };

    const resp = yield postJson(`${SERVER_API}/projects/details/update`, reqBody, { Authorization: `Bearer ${accessToken}` });
    const respJson = yield resp.json();

    yield put(actions.updateProjectDetailsSuccess(respJson.projectId, respJson.details));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* deleteProjectDetailsImageSaga(deleteData) {
  try {
    const accessToken = yield select(getAccessToken);
    yield put(actions.projectDetailsLoading());
    const resp = yield postJson(`${SERVER_API}/projects/details/delete`, deleteData, { Authorization: `Bearer ${accessToken}` });
    const respJson = yield resp.json();

    if (!resp.ok) {
      if (respJson?.message && respJson?.message === ErrorCodes.INVALID_TOKEN) {
        yield call(refreshTokenSaga);
        return yield put(actions.deleteProjectDetailsImage(deleteData.projectId));
      } else {
        return yield put(actions.fetchProjectsFail());
      }
    }

    yield put(actions.updateProjectDetailsSuccess(respJson.projectId, respJson.details));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}
