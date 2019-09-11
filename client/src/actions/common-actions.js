const ns = "common.actions";
const SHOW_SPINNER = `${ns}.showSpinner`;
const ORDER_SAVED = `${ns}.orderSaved`;
const ORDER_FAILED = `${ns}.orderFailed`;
export const SAVE_ORDER = `${ns}.saveOrder`;

export const showSpinner = showSpinner => ({
  type: SHOW_SPINNER,
  payload: { showSpinner }
});

export const saveOrder = data => ({ type: SAVE_ORDER, payload: data });
export const orderSaved = data => ({ type: ORDER_SAVED, payload: { data } });
export const orderFailed = error => ({
  type: ORDER_FAILED,
  payload: { error }
});

const initState = {};

function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_SPINNER: {
      return state.set("showSpinner", payload.showSpinner);
    }
    case ORDER_SAVED: {
      return state.setIn(["order", `${payload.data._id}`], payload.data);
    }
    case ORDER_FAILED: {
      return state.set("error", payload.error);
    }
    default:
      return state;
  }
}

export default reducer;
