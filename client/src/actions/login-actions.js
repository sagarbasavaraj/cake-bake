const ns = "login.actions";
const LOGIN_SUCCESS = `${ns}.loginSuccess`;
const LOGIN_FAILED = `${ns}.loginFailed`;
const CLEAR_ERROR = `${ns}.clearError`;
export const LOGIN = `${ns}.login`;

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: { user }
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  payload: { error }
});

export const login = user => ({ type: LOGIN, payload: user });

export const clearError = () => ({ type: CLEAR_ERROR });

const INITIAL_STATE = { user: {}, error: null };

const loginReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS: {
      return state.set("user", payload.user);
    }
    case LOGIN_FAILED: {
      return state.set("error", payload.error);
    }
    case CLEAR_ERROR: {
      return state.set("error", null);
    }
    default:
      return state;
  }
};

export default loginReducer;
