import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';

const composeEnhancers = composeWithDevTools({});

// TODO: Remove dummy data from initial state when data can be retrieved from server
const initialState = {
  balance: {
    newRound: {
      userId: 2,
      counterpartIds: [2, 3, 4, 5, 6],
      totalAmount: 25,
    },
    users: {
      2: 'Tony',
      3: 'Yetkin',
      4: 'David',
      5: 'Luke',
      6: 'Dan',
    },
    balances: {
      userBalance: { 2: 5.0 },
      counterpartBalances: {
        3: 0.0,
        4: -5.0,
        5: -5.0,
        6: -5.0,
      },
    },
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
