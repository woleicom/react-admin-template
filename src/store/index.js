import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reudcers";
import thunk from "redux-thunk";

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify here name, actionsBlacklist, actionsCreators and other options
    }) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);

export default store;
