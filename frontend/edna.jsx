// React
import React from 'react';
import ReactDOM from 'react-dom';
// Components
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById("root");

    let store; 
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { 
                id: window.currentUser.id 
            },
        }
        store = configureStore(preloadedState);
    } else {
        store = configureStore();
    }

    window.getState = store.getState;
    window.getDispatch = store.getDispatch;
    
    ReactDOM.render(<Root store={store} />, rootEl);
})