import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ use .client instead of 'react-dom'
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

// ✅ createRoot API for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// serviceWorker (you can keep or remove depending on needs)
serviceWorker.unregister();
