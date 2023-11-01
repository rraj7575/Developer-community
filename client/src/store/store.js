import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./../reducers/index";
import logger from "redux-logger";
const middleware = [thunk, logger];
const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

// const store = createStore(
//   rootReducer,
//   initialState,
//   applyMiddleware(...middleware)
// )
export default store;
