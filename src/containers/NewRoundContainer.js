import { connect } from 'react-redux';
import { setAmount, setStage, setNewRound, handleRoundCounterparts, resetRound } from '../actions';
import NewRound from '../components/NewRound';

export const mapStateToProps = state => ({
  totalAmount: state.round.totalAmount,
  roundCounterparts: state.round.counterpartIds,
  counterparts: state.balances.counterpartBalances,
});

const mapDispatchToProps = dispatch => ({
  getNewRound: () => {
    dispatch(setStage('balances'));
    dispatch(setNewRound());
    dispatch(resetRound());
  },
  getStage: stage => dispatch(setStage(stage)),
  getAmount: amount => dispatch(setAmount(amount)),
  handleRoundCounterparts: event => dispatch(handleRoundCounterparts(event.target.value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewRound);
