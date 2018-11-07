import { combineReducers } from 'redux';
import round from './round';
import balances from './balances';
import stage from './stage';
import user from './user';

export default combineReducers({ balances, stage, round, user });
