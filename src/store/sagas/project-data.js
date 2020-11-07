import { put } from "redux-saga/effects";
import * as actions from "../actions";

export function* fetchProjectDetailsSaga({ projectId }) {
  try {
    yield put(actions.fetchProjectDetailsLoading());

    const resp = yield fetch(
      `http://localhost:5000/api/projects/details/${projectId}`
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
