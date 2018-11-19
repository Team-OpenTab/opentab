import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    try {
      navigator.serviceWorker.register('/static/worker.js')
        .then(() => console.log('Service worker registered!'));
    } catch (err) {
      console.error(`Failed to register service worker: ${err}`);
    }
  }
});

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = composeWithDevTools({});
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
