import { connect } from 'react-redux';
import Balances from '../components/Balances';
import { setStage, showPayment } from '../actions';

const mapStateToProps = state => ({
  balances: state.balances,
  payment: state.payment,
});

const mapDispatchToProps = dispatch => ({
  getStage: stage => dispatch(setStage(stage)),
  showPayment: (payment, counterpartId) => dispatch(showPayment(payment, counterpartId)),
  // handleButtonClick: buttonLabel => {
  //   dispatch(handleButtonClick(buttonLabel));
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Balances);
