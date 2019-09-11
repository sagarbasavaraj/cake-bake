import { call, put, takeEvery, all } from "redux-saga/effects";
import { post } from "../helpers/api";
import { showSpinner } from "../actions/common-actions";
import { orderSaved, orderFailed, SAVE_ORDER } from "../actions/order-actions";
import {
  loginSuccess,
  setError,
  LOGIN,
  SIGN_UP
} from "../actions/login-actions";

//-----------LOGIN SAGAS --------------------------------------------------
function* login(action) {
  try {
    yield put(showSpinner(true));
    const user = yield call(post, "/users/login", action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(setError(error));
  } finally {
    yield put(showSpinner(false));
  }
}

function* signup(action) {
  try {
    yield put(showSpinner(true));
    yield call(post, "/users/signup", action.payload);
    // navigate to login page.
  } catch (error) {
    yield put(setError(error));
  } finally {
    yield put(showSpinner(false));
  }
}

function* signupSaga() {
  yield takeEvery(SIGN_UP, signup);
}

function* loginSaga() {
  yield takeEvery(LOGIN, login);
}

//-----------END OF LOGIN SAGAS -------------------------------------------

//-----------ORDER SAGAS ----------------------------------------------------

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

function* orderSaga() {
  yield takeEvery(SAVE_ORDER, saveOrder);
}

//-----------END OF ORDER SAGAS ----------------------------------------------------

export default function* rootSaga() {
  yield all([orderSaga(), signupSaga(), loginSaga()]);
}
