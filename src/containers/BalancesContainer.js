import { connect } from 'react-redux';
import Balances from '../components/Balances';
import { setStage, showPayment, settleBalance, fetchBalances } from '../actions';

const mapStateToProps = state => ({
  balances: state.balances,
  payment: state.payment,
  userId: state.user.id,
});

const mapDispatchToProps = dispatch => ({
  getStage: stage => dispatch(setStage(stage)),
  showPayment: (payment, receiverId) => dispatch(showPayment(payment, receiverId)),
  settleBalance: () => dispatch(settleBalance()),]
  showPayment: (payment, counterpartId) => dispatch(showPayment(payment, counterpartId)),
  fetchBalances: userId => dispatch(fetchBalances(userId)),
  settleBalance: () => dispatch(settleBalance()),
  // handleButtonClick: buttonLabel => {
  //   dispatch(handleButtonClick(buttonLabel));
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Balances);
