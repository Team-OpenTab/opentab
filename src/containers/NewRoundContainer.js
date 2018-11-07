import { connect } from 'react-redux';
import {
  setAmount,
  monitorCheckedUser,
  storeCheckedUsersFinal,
  setStage,
  setNewRound,
} from '../actions';
import NewRound from '../components/NewRound';

const mapStateToProps = state => ({
  totalAmount: state.round.totalAmount,
  counterpartIds: state.round.checkedUsers,
  counterparts: state.balances.counterpartBalances,
});

const mapDispatchToProps = dispatch => ({
  getNewRound: () => {
    dispatch(setStage('balances'));
    dispatch(setNewRound());
  },
  getStage: stage => dispatch(setStage(stage)),
  getAmount: amount => dispatch(setAmount(amount)),
  monitorCheckedUser: user => dispatch(monitorCheckedUser(user)),
  submitCheckedUsers: (users, amount) => dispatch(storeCheckedUsersFinal(users, amount)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewRound);
