import { call, put, takeEvery, all } from "redux-saga/effects";
import { post } from "../helpers/api";

function* save(action) {
  try {
    const data = yield call(post, "/orders", action.payload);
    yield put({ type: "SAVE_SUCCEEDED", data });
  } catch (error) {
    yield put({ type: "SAVE_FAILED", error });
  }
}

function* watchSave() {
  yield takeEvery("SAVE_REQUESTED", save);
}

export default function* rootSaga() {
  yield all([watchSave()]);
}
