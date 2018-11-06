import { connect } from 'react-redux';
import { storeCheckedUsersFinal } from '../actions';
import SubmitCheckedUsers from '../components/SubmitCheckedUsers';

const mapStateToProps = state => ({
  checkedUsers: state.newRoundReducer.checkedUsers,
  amount: state.newRoundReducer.amount,
});

const mapDispatchToProps = dispatch => ({
  submitCheckedUsers: users => dispatch(storeCheckedUsersFinal(users)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitCheckedUsers);
