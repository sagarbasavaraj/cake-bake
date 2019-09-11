import { call, put, takeEvery, all } from "redux-saga/effects";
import { post } from "../helpers/api";
import {
  showSpinner,
  orderSaved,
  orderFailed,
  SAVE_ORDER
} from "../actions/common-actions";
import { loginSuccess, loginFailed, LOGIN } from "../actions/login-actions";

function* saveOrder(action) {
  try {
    yield put(showSpinner(true));
    const data = yield call(post, "/orders", action.payload);
    yield put(orderSaved(data));
  } catch (error) {
    yield put(orderFailed(error));
  } finally {
    yield put(showSpinner(false));
  }
}

function* login(action) {
  try {
    yield put(showSpinner(true));
    const user = yield call(post, "/users/login", action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailed(error));
  } finally {
    yield put(showSpinner(false));
  }
}

function* orderSaga() {
  yield takeEvery(SAVE_ORDER, saveOrder);
}

function* loginSaga() {
  yield takeEvery(LOGIN, login);
}

export default function* rootSaga() {
  yield all([orderSaga(), loginSaga()]);
}
