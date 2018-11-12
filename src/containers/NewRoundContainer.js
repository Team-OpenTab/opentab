import { connect } from 'react-redux';
import {
  setAmount,
  setStage,
  setNewRound,
  handleRoundCounterparts,
  resetRound,
  setSplitType,
  setRecipientAmount,
  refreshRecipientAmounts,
} from '../actions';
import NewRound from '../components/NewRound';

export const mapStateToProps = state => ({
  totalAmount: state.round.totalAmount,
  recipients: state.round.recipients,
  counterparts: state.balances.counterpartBalances,
  userId: state.user.id,
  splitType: state.round.splitType,
});

const mapDispatchToProps = dispatch => ({
  getNewRound: () => {
    dispatch(setNewRound());
    dispatch(setStage('balances'));
    dispatch(resetRound());
  },
  getStage: stage => dispatch(setStage(stage)),
  getAmount: amount => {
    dispatch(setAmount(amount));
    dispatch(refreshRecipientAmounts());
  },
  handleRoundCounterparts: event => {
    dispatch(handleRoundCounterparts(event.target.value));
    dispatch(refreshRecipientAmounts());
  },
  getSplitType: splitType => {
    dispatch(setSplitType(splitType));
    dispatch(refreshRecipientAmounts());
  },
  getRecipientAmount: (id, amount) => dispatch(setRecipientAmount(id, amount)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewRound);
