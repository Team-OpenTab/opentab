import { connect } from 'react-redux';
import Session from '../components/Session';
import { fetchBalances, fetchRoundHistory } from '../actions';

const mapStateToProps = (state) => ({
  stage: state.stage,
  userId: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBalances: (userId) => dispatch(fetchBalances(userId)),
  fetchRoundHistory: (userId) => dispatch(fetchRoundHistory(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Session);
