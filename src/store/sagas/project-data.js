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
        respJson.projectDetails.projectId,
        respJson.projectDetails.data
      )
    );
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}

export function* updateProjectDetailsSaga({ projectId, data }) {
  try {
    yield put(actions.projectDetailsLoading());
    
    yield delay(1000);
    
    const reqBody = JSON.stringify({
      projectId,
      data
    });

    const resp = yield fetch(`${SERVER_API}/projects/details`, {
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
        respJson.data
      )
    );
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}
