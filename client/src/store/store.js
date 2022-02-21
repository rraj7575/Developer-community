import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './../reducers/index'
import logger from 'redux-logger'
const middleware = [thunk, logger]
const initialState = {}

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     applyMiddleware(...middleware)
//   )
// )

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)
 export default store