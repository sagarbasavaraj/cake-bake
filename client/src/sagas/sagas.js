import { call, put, takeEvery, all } from "redux-saga/effects";
import { post } from "../helpers/api";

function* saveOrder(action) {
  try {
    yield put({ type: "SET_SPINNER_STATUS", payload: { showSpinner: true } });
    const data = yield call(post, "/orders", action.payload);
    yield put({ type: "SAVE_ORDER_SUCCEEDED", payload: { data } });
  } catch (error) {
    yield put({ type: "SAVE_ORDER_FAILED", payload: { error } });
  } finally {
    yield put({ type: "SET_SPINNER_STATUS", payload: { showSpinner: false } });
  }
}

function* orderSaga() {
  yield takeEvery("SAVE_ORDER", saveOrder);
}

export default function* rootSaga() {
  yield all([orderSaga()]);
}
