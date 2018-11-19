import { connect } from 'react-redux';
import TitleBar from '../components/TitleBar';
import { setStage, logoutUser, resetRound } from '../actions';

const mapStateToProps = (state) => ({
  stage: state.stage,
});

const mapDispatchToProps = (dispatch) => ({
  getStage: (stage) => dispatch(setStage(stage)),
  logoutUser: () => dispatch(logoutUser()),
  resetRound: () => dispatch(resetRound()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TitleBar);
