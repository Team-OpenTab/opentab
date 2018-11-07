import { connect } from 'react-redux';
import { storeInputtedAmount, monitorCheckedUser, storeCheckedUsersFinal } from '../actions';
import NewRound from '../components/NewRound';
import { goBack, handleButtonClick } from '../actions';

const mapStateToProps = state => ({
  amount: state.newRoundReducer.amount,
  checkedUsers: state.newRoundReducer.checkedUsers,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  goBack: previousComponent => {
    dispatch(goBack(previousComponent));
  },
  handleButtonClick: buttonLabel => {
    dispatch(handleButtonClick(buttonLabel));
  },
  affectAmountPaid: amount => dispatch(storeInputtedAmount(amount)),
  monitorCheckedUser: user => dispatch(monitorCheckedUser(user)),
  submitCheckedUsers: (users, amount) => dispatch(storeCheckedUsersFinal(users, amount)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewRound);
