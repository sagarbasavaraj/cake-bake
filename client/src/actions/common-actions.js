const ns = "common.actions";
const SHOW_SPINNER = `${ns}.showSpinner`;

export const showSpinner = showSpinner => ({
  type: SHOW_SPINNER,
  payload: { showSpinner }
});

const initialState = { showSpinner: false };

function commonReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_SPINNER: {
      return state.set("showSpinner", payload.showSpinner);
    }
    default:
      return state;
  }
}

export default commonReducer;
