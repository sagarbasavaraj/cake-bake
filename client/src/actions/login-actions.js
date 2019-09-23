const ns = "login.actions";
const LOGIN_SUCCESS = `${ns}.loginSuccess`;
export const LOGIN_ERROR = `${ns}.loginError`;
const CLEAR_ERROR = `${ns}.clearError`;
export const LOGIN = `${ns}.login`;
export const SIGN_UP = `${ns}.signup`;
export const LOGOUT = `${ns}.logout`;
const LOGOUT_SUCCESS = `${ns}.logoutSuccess`;

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: { user }
});

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: { error }
});

export const login = user => ({ type: LOGIN, payload: user });
export const signup = user => ({ type: SIGN_UP, payload: user });
export const logout = () => ({ type: LOGOUT });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

export const clearError = () => ({ type: CLEAR_ERROR });

const INITIAL_STATE = { user: null, error: null };

const loginReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS: {
      return state.set("user", payload.user);
    }
    case LOGIN_ERROR: {
      return state.set("error", payload.error);
    }
    case CLEAR_ERROR: {
      return state.set("error", null);
    }
    case LOGOUT_SUCCESS: {
      return state.set("user", null);
    }
    default:
      return state;
  }
};

export default loginReducer;
