// React
import React from 'react';
import ReactDOM from 'react-dom';
// Components
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById("root");
    ReactDOM.render(<h1>Edna E Mode</h1>, rootEl);
})