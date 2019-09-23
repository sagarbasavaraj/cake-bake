import {
  fork,
  call,
  put,
  takeEvery,
  all,
  cancel,
  take
} from "redux-saga/effects";
import { post, get } from "../helpers/api";
import { showSpinner } from "../actions/common-actions";
import { orderSaved, orderFailed, SAVE_ORDER } from "../actions/order-actions";
import {
  loginSuccess,
  loginError,
  LOGIN,
  SIGN_UP,
  LOGOUT,
  LOGIN_ERROR,
  logoutSuccess
} from "../actions/login-actions";
import { navigateTo } from "../helpers/navigation";

//-----------LOGIN SAGAS --------------------------------------------------

function* authorize(email, password) {
  try {
    yield put(showSpinner(true));
    const user = yield call(post, "/users/login", { email, password });
    yield put(loginSuccess(user));
    yield call(navigateTo, "/");
  } catch (error) {
    yield put(loginError(error));
  } finally {
    yield put(showSpinner(false));
  }
}

function* logout() {
  try {
    console.log("calling logout");
    yield call(get, "/users/logout");
    yield put(logoutSuccess());
    yield call(navigateTo, "/");
  } catch (error) {
    console.error("Error in logging out..", error);
  }
}

function* loginFlow() {
  while (true) {
    const {
      payload: { email, password }
    } = yield take(LOGIN);
    const task = yield fork(authorize, email, password);
    const action = yield take([LOGOUT, LOGIN_ERROR]);
    console.log(action);
    if (action.type === LOGOUT) {
      yield cancel(task);
      yield call(logout);
    }
  }
}

function* signup(action) {
  try {
    yield put(showSpinner(true));
    yield call(post, "/users/signup", action.payload);
    yield call(navigateTo, "/login");
  } catch (error) {
    yield put(loginError(error));
  } finally {
    yield put(showSpinner(false));
  }
}

function* signupSaga() {
  yield takeEvery(SIGN_UP, signup);
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
  yield all([orderSaga(), signupSaga(), loginFlow()]);
}
