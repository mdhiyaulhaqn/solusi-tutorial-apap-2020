import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppFunc from "./AppFunc";
import AppClass from "./App";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <>
    <div className="mt-5" />
      <AppClass />
    <div className="mt-5 mb-5" />
      <AppFunc />
    <div className="mt-5 mb-5" />
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
