import { delay, put } from "redux-saga/effects";
import * as actions from "../actions";
import { getServerAPI } from '../../tools/helpers';

const SERVER_API = `${getServerAPI()}/api`;

export function* fetchProjectDetailsSaga({ projectId }) {
  try {
    yield put(actions.projectDetailsLoading());

    const resp = yield fetch(
      `${SERVER_API}/projects/details/${projectId}`
    );
    // const resp = yield fetch('http://192.168.2.116:5000/api/projects/');
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

export function* saveProjectDetailsSaga({ projectId, data }) {
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
      actions.saveProjectDetailsSuccess(
        respJson.projectId,
        respJson.data
      )
    );
  } catch (err) {
    console.log(err);
    yield put(actions.fetchProjectsFail());
  }
}
