import { connect } from 'react-redux';
import {
  setAmount,
  setStage,
  setNewRound,
  handleRoundCounterparts,
  resetRound,
  setSplitType,
  setRecipientAmount,
  setRoundName,
  refreshRecipientAmounts,
} from '../actions';
import NewRound from '../components/NewRound';

export const mapStateToProps = state => ({
  totalAmount: state.round.totalAmount,
  recipients: state.round.recipients,
  round: state.round,
  counterparts: state.balances.counterpartBalances,
  userId: state.user.id,
  stage: state.stage,
  contacts: state.contacts.contactList,
  roundName: state.round.roundName,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  resetRound: () => dispatch(resetRound()),
  getRoundName: roundName => dispatch(setRoundName(roundName)),
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
