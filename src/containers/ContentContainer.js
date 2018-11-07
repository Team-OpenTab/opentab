import { connect } from 'react-redux';
import Content from '../components/Content';
import { fetchBalances } from '../actions';

const mapStateToProps = state => ({
  stage: state.stage,
});

const mapDispatchToProps = dispatch => ({
  fetchBalances: userId => dispatch(fetchBalances(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
