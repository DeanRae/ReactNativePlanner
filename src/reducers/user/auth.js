import * as types from '../../actions/user/actionTypes';

const initialState = {
  restoring: false,
  sessionLoading: false,
  user: {},
  sessionError: null,
  logged: null,
  registered: null,
  resetPassword: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.SESSION_RESTORING:
      return { ...state, restoring: true };
    case types.SESSION_LOADING:
      return { ...state, restoring: false, sessionLoading: true, sessionError: null };
    case types.SESSION_SUCCESS:
      return {
        ...state,
        restoring: false,
        sessionLoading: false,
        user: action.user,
        sessionError: null,
        logged: true,
        resetPassword: false
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        restoring: false,
        sessionLoading: false,
        user: action.user,
        sessionError: null,
        logged: true,
        resetPassword: false
      };
    case types.SESSION_ERROR:
      return {
        ...state,
        restoring: false,
        sessionLoading: false,
        user: null,
        sessionError: action.error,
        logged: null,
        resetPassword: false
      };
    case types.ERROR_ACKNOWLEDGED:
      return {
        ...state,
        sessionError: null
      };
    case types.SESSION_LOGOUT:
      return initialState;
    case types.USER_PROFILE_MODIFIED:
      return {...state, ...action.user};
    case types.EMAILED_PASSWORD_RESET:
      return {
        ...state,
        resetPassword: action.passwordReset,
      }
    default:
      return state;
  }
};

export default auth;