const ns = "common.actions";

const SHOW_SPINNER = `${ns}.showSpinner`;
export const CLEAR_STATE = `${ns}.clearState`;
export const showSpinner = showSpinner => ({
  type: SHOW_SPINNER,
  payload: { showSpinner }
});
export const clearState = () => ({ type: CLEAR_STATE });

const INITIAL_STATE = { showSpinner: false };

function commonReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_SPINNER: {
      return state.set("showSpinner", payload.showSpinner);
    }
    case CLEAR_STATE: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export default commonReducer;
