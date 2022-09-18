// import { updateObject } from '../../tools/helpers';
// import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tags: [],
  error: false,
  loading: false
};

// const authorizeUserSuccess = (state) => {
//   return updateObject(state, {
//     isAuthorized: true, isAdmin: true
//   });
// };

// const unAuthorizeUserSuccess = (state) => {
//   return updateObject(state, {
//     isAuthorized: false, isAdmin: false
//   });
// };

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.AUTHORIZE_USER_SUCCESS: return authorizeUserSuccess(state);
    // case actionTypes.UNAUTHORIZE_USER_SUCCESS: return unAuthorizeUserSuccess(state);
    default:
      return state;
  }
};

export default tagsReducer;