import { connect } from 'react-redux';
import Balances from '../components/Balances';
import {
  setStage,
  showPayment,
  settleBalance,
  fetchBalances,
  handleContactSearch,
  addContact,
  fetchRoundHistory,
} from '../actions';

const mapStateToProps = state => ({
  balances: state.balances,
  payment: state.payment,
  userId: state.user.id,
  contactSearchResults: state.contacts.search.searchResults,
  contactSearchString: state.contacts.search.searchString,
});

const mapDispatchToProps = dispatch => ({
  getStage: stage => dispatch(setStage(stage)),
  showPayment: (payment, receiverId) => dispatch(showPayment(payment, receiverId)),
  settleBalance: () => dispatch(settleBalance()),
  fetchBalances: userId => dispatch(fetchBalances(userId)),
  handleContactSearch: event => dispatch(handleContactSearch(event.target.value)),
  addContact: contactId => dispatch(addContact(contactId)),
  fetchRoundHistory: userId => dispatch(fetchRoundHistory(userId)),
  // handleButtonClick: buttonLabel => {
  //   dispatch(handleButtonClick(buttonLabel));
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Balances);
