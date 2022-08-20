import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
// import UsersProvider from './providers/UsersProvider';
import { subscribeToAuth } from "./store/actions/authActions";
import reducer from "./store/reducers/reducers";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
// @ts-ignore
store.dispatch(subscribeToAuth());

const index = (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(index, document.getElementById("root"));
