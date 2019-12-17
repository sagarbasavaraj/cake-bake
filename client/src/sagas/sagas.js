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
import { showSpinner } from "../actions/common-actions";
import { orderSaved, orderFailed, SAVE_ORDER } from "../actions/order-actions";
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
import storage from "../helpers/storage-service";
import { USER_INFO_STORAGE_KEY } from "../helpers/constants";

//-----------LOGIN SAGAS --------------------------------------------------

function* authorize(email, password) {
  try {
    yield put(showSpinner(true));
    const user = yield call(post, "/users/login", { email, password });
    yield put(setUserLoggedStatus(true));
    yield call([storage, storage.saveItem], USER_INFO_STORAGE_KEY, user.token);
    yield put(setCustomerData(omit(user, "token")));
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
    yield call([storage, storage.removeItem], USER_INFO_STORAGE_KEY);
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

function* getProfile(token) {
  try {
    const customerData = yield call(get, "/users/profile", { token });
    yield put(setUserLoggedStatus(true));
    yield put(setCustomerData(customerData));
  } catch (error) {
    yield put(loginError(error));
  }
}

function* loadCustomerProfile() {
  while (true) {
    const {
      payload: { token }
    } = yield take(LOAD_PROFILE);
    const task = yield fork(getProfile, token);
    const action = yield take([LOGOUT, LOGIN_ERROR]);
    if (action.type === LOGOUT) {
      yield cancel(task);
      yield call(logout);
    }
    //if unable to load profile clear token from local storage.
    if (action.type === LOGIN_ERROR) {
      yield call([storage, storage.removeItem], USER_INFO_STORAGE_KEY);
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
    const token = yield call([storage, storage.getItem], USER_INFO_STORAGE_KEY);
    if (!token) {
      yield call(navigateTo, "/login");
      return;
    }
    const customer = yield select(getCustomer);
    const data = yield call(
      post,
      `/orders`,
      { ...action.payload, user: customer.id },
      { token }
    );
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
