import { combineReducers } from 'redux';
import newRoundReducer from './newRoundReducer';
import balance from './balance';
import stage from './stage';

export default combineReducers({ balance, stage, newRoundReducer });
