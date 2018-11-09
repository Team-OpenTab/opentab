import { connect } from 'react-redux';
import Balances from '../components/Balances';
import { setStage, showPayment, settleBalance } from '../actions';

const mapStateToProps = state => ({
  balances: state.balances,
  payment: state.payment,
});

const mapDispatchToProps = dispatch => ({
  getStage: stage => dispatch(setStage(stage)),
  showPayment: (payment, receiverId) => dispatch(showPayment(payment, receiverId)),
  settleBalance: () => dispatch(settleBalance()),
  // handleButtonClick: buttonLabel => {
  //   dispatch(handleButtonClick(buttonLabel));
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Balances);
