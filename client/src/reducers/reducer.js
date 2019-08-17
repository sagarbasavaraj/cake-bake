const initState = {};

function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_SPINNER_STATUS": {
      return state.set("showSpinner", payload.showSpinner);
    }
    case "SAVE_ORDER_SUCCEEDED": {
      return state.setIn(["order", `${payload.data._id}`], payload.data);
    }
    case "SAVE_ORDER_FAILED": {
      return state.set("error", payload.error);
    }
    default:
      return state;
  }
}

export default reducer;
