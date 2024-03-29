import {
  fork,
  call,
  put,
  takeEvery,
  all,
  cancel,
  take,
  select
} from "redux-saga/effects";
import { omit } from "lodash";
import { post, get } from "../helpers/api";
import { showSpinner, clearState } from "../actions/common-actions";
import {
  orderSaved,
  orderFailed,
  SAVE_ORDER,
  saveOrders
} from "../actions/order-actions";
import {
  loginError,
  LOGIN,
  SIGN_UP,
  LOGOUT,
  LOGIN_ERROR,
  setUserLoggedStatus,
  LOAD_PROFILE,
  setCustomerData
} from "../actions/login-actions";
import { navigateTo } from "../helpers/navigation";

//-----------LOGIN SAGAS --------------------------------------------------

function* authorize(email, password) {
  try {
    yield put(showSpinner(true));
    const user = yield call(post, "/users/login", { email, password });
    yield put(setUserLoggedStatus(true));
    yield put(saveOrders(user.orders));
    yield put(setCustomerData(omit(user, ["token", "orders"])));
    yield call(navigateTo, "/");
  } catch (error) {
    yield put(loginError(error));
  } finally {
    yield put(showSpinner(false));
  }
}

function* logout() {
  try {
    yield call(get, "/users/logout");
    yield put(setUserLoggedStatus(false));
    yield put(clearState());
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
    if (action.type === LOGOUT) {
      yield cancel(task);
      yield call(logout);
    }
  }
}

function* getProfile() {
  try {
    const customerData = yield call(get, "/users/profile");
    yield put(setUserLoggedStatus(true));
    yield put(saveOrders(customerData.orders));
    yield put(setCustomerData(omit(customerData, ["orders"])));
  } catch (error) {
    yield put(loginError(error));
  }
}

function* loadCustomerProfile() {
  while (true) {
    yield take(LOAD_PROFILE);
    const task = yield fork(getProfile);
    const action = yield take([LOGOUT, LOGIN_ERROR]);
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

const getCustomer = state => state.session.customer;

function* saveOrder(action) {
  try {
    yield put(showSpinner(true));
    const customer = yield select(getCustomer);
    const data = yield call(post, `/orders`, {
      ...action.payload,
      user: customer.id
    });
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
  yield all([signupSaga(), loginFlow(), loadCustomerProfile(), orderSaga()]);
}
