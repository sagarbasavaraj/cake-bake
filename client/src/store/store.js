import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux-seamless-immutable";

import commonReducer from "../actions/common-actions";
import loginReducer from "../actions/login-actions";
import orderReducer from "../actions/order-actions";
import rootSaga from "../sagas/sagas";

const rootReducer = combineReducers({
  common: commonReducer,
  session: loginReducer,
  order: orderReducer
});

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore() {
  const sagaMiddleware = createSagaMiddleware({
    onError: (error, sagaStack) => {
      console.error(error, " stack - ", sagaStack);
    }
  });
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
