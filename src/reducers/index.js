import { combineReducers } from 'redux';
import round from './round';
import balances from './balances';
import stage from './stage';
import user from './user';
import payment from './payment';
import contacts from './contacts';

export default combineReducers({ balances, stage, round, user, payment, contacts });
