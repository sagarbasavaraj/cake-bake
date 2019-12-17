import { CLEAR_STATE } from "./common-actions";

const ns = "login.actions";
export const LOGIN_ERROR = `${ns}.loginError`;
const CLEAR_ERROR = `${ns}.clearError`;
export const LOGIN = `${ns}.login`;
export const SIGN_UP = `${ns}.signup`;
export const LOGOUT = `${ns}.logout`;
const USER_LOGGED = `${ns}.userLogged`;
const SET_CUSTOMER_DATA = `${ns}.setCustomerData`;
export const LOAD_PROFILE = `${ns}.loadProfile`;

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: { error }
});

export const login = user => ({ type: LOGIN, payload: user });
export const signup = user => ({ type: SIGN_UP, payload: user });
export const logout = () => ({ type: LOGOUT });
export const setUserLoggedStatus = status => ({
  type: USER_LOGGED,
  payload: { status }
});
export const loadProfile = token => ({
  type: LOAD_PROFILE,
  payload: { token }
});
export const clearError = () => ({ type: CLEAR_ERROR });
export const setCustomerData = data => ({
  type: SET_CUSTOMER_DATA,
  payload: { data }
});

const INITIAL_STATE = { error: null, isUserLoggedIn: false, customer: null };

const loginReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGGED: {
      return state.set("isUserLoggedIn", payload.status);
    }
    case SET_CUSTOMER_DATA: {
      return state.set("customer", payload.data);
    }
    case LOGIN_ERROR: {
      return state.set("error", payload.error);
    }
    case CLEAR_ERROR: {
      return state.set("error", null);
    }
    case CLEAR_STATE: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};

export default loginReducer;
