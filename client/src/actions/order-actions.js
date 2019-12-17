import { keyBy } from "lodash";
import {CLEAR_STATE} from "./common-actions";

const ns = "order.actions";

const ORDER_SAVED = `${ns}.orderSaved`;
const ORDER_FAILED = `${ns}.orderFailed`;
export const SAVE_ORDER = `${ns}.saveOrder`;
export const SAVE_ORDERS = `${ns}.saveOrders`;

export const saveOrder = data => ({ type: SAVE_ORDER, payload: data });
export const saveOrders = data => ({ type: SAVE_ORDERS, payload: { data } });
export const orderSaved = data => ({ type: ORDER_SAVED, payload: { data } });
export const orderFailed = error => ({
  type: ORDER_FAILED,
  payload: { error }
});

const INITIAL_STATE = { data: null, error: null };

const normalize = orders => keyBy(orders, "_id");

function orderReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case SAVE_ORDERS: {
      return state.set("data", normalize(payload.data));
    }
    case ORDER_SAVED: {
      return state.setIn(["data", `${payload.data._id}`], payload.data);
    }
    case ORDER_FAILED: {
      return state.set("error", payload.error);
    }
    case CLEAR_STATE: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export default orderReducer;
