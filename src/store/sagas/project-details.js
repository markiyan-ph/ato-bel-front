import { delay, put } from "redux-saga/effects";
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
    
    yield delay(1000);
    
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
