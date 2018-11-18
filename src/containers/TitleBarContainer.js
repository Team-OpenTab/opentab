import { connect } from 'react-redux';
import TitleBar from '../components/TitleBar';
import { setStage, logoutUser } from '../actions';

const mapStateToProps = (state) => ({
  stage: state.stage,
});

const mapDispatchToProps = (dispatch) => ({
  getStage: (stage) => dispatch(setStage(stage)),
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TitleBar);
