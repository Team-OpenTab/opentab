import { combineReducers } from 'redux';
import balance from './balance';
import stage from './stage';

export default combineReducers({ balance, stage });
