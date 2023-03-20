import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { addUserSaga, fetchUsersSaga, loginSaga, logoutSaga, refreshTokenSaga } from './authorization';
import {
  fetchProjectDetailsSaga,
  updateProjectDetailsSaga,
  updateProjectDetailsImageSaga,
  deleteProjectDetailsImageSaga,
} from './project-details';
import {
  fetchMainPageProjectsSaga,
  fetchProjectsSaga,
  addProjectSaga,
  deleteProjectSaga,
  updateProjectSaga,
  addMainProjectSaga,
  deleteMainProjectSaga,
} from './projects';
import { saveTagSaga, deleteTagSaga, fetchTagsSaga, updateTagSaga } from './tags';

export const getAccessToken = state => state.authorization.accessToken;

export function* watchProjects() {
  yield takeEvery(actionTypes.AUTHORIZE_USER, loginSaga);
  yield takeEvery(actionTypes.UNAUTHORIZE_USER, logoutSaga);
  yield takeEvery(actionTypes.REFRESH_TOKEN, refreshTokenSaga);
  yield takeEvery(actionTypes.FETCH_USERS, fetchUsersSaga);
  yield takeEvery(actionTypes.ADD_USER, addUserSaga);
  // yield takeEvery(actionTypes.DELETE_USER, fetchProjectsSaga);
  yield takeEvery(actionTypes.FETCH_PROJECTS, fetchProjectsSaga);
  yield takeEvery(actionTypes.FETCH_MAIN_PAGE_PROJECTS, fetchMainPageProjectsSaga);
  yield takeEvery(actionTypes.FETCH_PROJECT_DETAILS, fetchProjectDetailsSaga);
  yield takeEvery(actionTypes.UPDATE_PROJECT_DETAILS, updateProjectDetailsSaga);
  yield takeEvery(actionTypes.UPDATE_PROJECT_DETAILS_IMAGE, updateProjectDetailsImageSaga);
  yield takeEvery(actionTypes.DELETE_PROJECT_DETAILS_IMAGE, deleteProjectDetailsImageSaga);
  yield takeEvery(actionTypes.ADD_PROJECT, addProjectSaga);
  yield takeEvery(actionTypes.ADD_MAIN_PAGE_PROJECT_IMAGE, addMainProjectSaga);
  yield takeEvery(actionTypes.DELETE_MAIN_PAGE_PROJECT_IMAGE, deleteMainProjectSaga);
  yield takeEvery(actionTypes.UPDATE_PROJECT, updateProjectSaga);
  yield takeEvery(actionTypes.DELETE_PROJECT, deleteProjectSaga);
  yield takeEvery(actionTypes.FETCH_TAGS, fetchTagsSaga);
  yield takeEvery(actionTypes.SAVE_TAGS, saveTagSaga);
  yield takeEvery(actionTypes.UPDATE_TAGS, updateTagSaga);
  yield takeEvery(actionTypes.DELETE_TAG, deleteTagSaga);
}
