import { put } from "redux-saga/effects";
import { postJson } from "../../tools";
import * as actions from "../actions";

const SERVER_API = `/api`;

export function* fetchProjectDetailsSaga({ projectId }) {
  try {
    yield put(actions.projectDetailsLoading());

    const resp = yield fetch(
      `${SERVER_API}/projects/details/${projectId}`
    );
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
    yield put(actions.projectDetailsLoading());
    // yield delay(1000);
    
    const reqBody = JSON.stringify({
      projectId,
      details
    });

    const resp = yield fetch(`${SERVER_API}/projects/details/update`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: reqBody
    });

    const respJson = yield resp.json();

    yield put(
      actions.updateProjectDetailsSuccess(
        respJson.projectId,
        respJson.details
      )
    );
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* updateProjectDetailsImageSaga({ formData, projectId, details }) {
  try {
    yield put(actions.projectDetailsLoading());
    // yield delay(1000);

    const respImgUpdate = yield fetch(`${SERVER_API}/projects/details/update/image`, {
      method: 'POST',
      body: formData
    });
    const respImgUpdateJson = yield respImgUpdate.json();
    console.log('respImgUpdateJson', respImgUpdateJson);
    const newDetails = JSON.parse(JSON.stringify(details));
    console.log('newDetails', newDetails);
    
    if (respImgUpdateJson?.titleImage === true) {
      newDetails.detailTitleImage = respImgUpdateJson.name;
    } else {
      newDetails.images[respImgUpdateJson.imgIndex].img = respImgUpdateJson.name;
    }

    console.log('details', details);

    const reqBody = JSON.stringify({
      projectId,
      details: newDetails
    });

    const resp = yield  postJson(`${SERVER_API}/projects/details/update`, reqBody);
    const respJson = yield resp.json();

    yield put(
      actions.updateProjectDetailsSuccess(
        respJson.projectId,
        respJson.details
      )
    );
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}
