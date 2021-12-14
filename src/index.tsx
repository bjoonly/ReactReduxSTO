import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from "./store";
import { AuthUser } from './components/Auth/actions';

if (localStorage.token) {
  AuthUser(localStorage.token, store.dispatch)
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
