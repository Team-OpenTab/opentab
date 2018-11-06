import { connect } from 'react-redux';
import { storeInputtedAmount } from '../actions';
import AmountToPay from '../components/AmountToPay';

const mapStateToProps = state => ({
  amount: state.newRoundReducer.amount,
});

const mapDispatchToProps = dispatch => ({
  affectAmountPaid: amount => dispatch(storeInputtedAmount(amount)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AmountToPay);
