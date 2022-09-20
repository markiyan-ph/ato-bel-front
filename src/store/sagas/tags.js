import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import { postJson, getServerAPI } from '../../tools/helpers';

const SERVER_API = `${getServerAPI()}/api`;

// export function* fetchProjectsSaga({page_size, page_num}) {
//   try {
//     yield put(actions.fetchProjectsLoading());
    
//     const resp = yield fetch(`${SERVER_API}/projects?page_size=${page_size}&page_num=${page_num}`);
//     // const resp = yield fetch('http://192.168.2.116:5000/api/projects/');
//     const respJson = yield resp.json();
//     yield put(actions.fetchProjectsSuccess(respJson.projects));
  
//   } catch (err) {
//     console.log(err);
//     yield put(actions.fetchProjectsFail());
//   }
// }

export function* saveTagSaga({tag}) {
  try {
    const resp = yield postJson(`${SERVER_API}/tags/save`, JSON.stringify(tag));
    const respJson = yield resp.json();
    yield put(actions.saveTagSuccess(respJson));
  
  } catch (err) {
    console.log(err);
    yield put(actions.saveTagFail());
  }
}