import { connect } from 'react-redux';
import Balances from '../components/Balances';
import {
  setStage,
  showPayment,
  settleBalance,
  fetchBalances,
  handleContactSearch,
  addContact,
  approveContact,
  fetchRoundHistory,
} from '../actions';

const mapStateToProps = state => ({
  balances: state.balances,
  payment: state.payment,
  userId: state.user.id,
  contactList: state.contacts.contactList,
  contactSearchResults: state.contacts.search.searchResults,
  contactSearchString: state.contacts.search.searchString,
  stage: state.stage,
});

const mapDispatchToProps = dispatch => ({
  getStage: stage => dispatch(setStage(stage)),
  showPayment: (payment, receiverId) => dispatch(showPayment(payment, receiverId)),
  settleBalance: () => dispatch(settleBalance()),
  fetchBalances: userId => dispatch(fetchBalances(userId)),
  handleContactSearch: event => dispatch(handleContactSearch(event.target.value)),
  addContact: contactId => dispatch(addContact(contactId)),
  approveContact: contactId => dispatch(approveContact(contactId)),
  fetchRoundHistory: userId => dispatch(fetchRoundHistory(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Balances);
