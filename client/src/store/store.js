import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from 'redux-seamless-immutable'

import commonReducer from "../reducers/reducer";
import {rootSaga} from "../sagas/sagas";

const rootReducer = combineReducers({
  common: commonReducer
})

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    bindMiddleware([sagaMiddleware])
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
