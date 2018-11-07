import { connect } from 'react-redux';
import Balances from '../components/Balances';
import { setStage } from '../actions';

const mapStateToProps = state => ({
  balances: state.balances,
});

const mapDispatchToProps = dispatch => ({
  getStage: stage => dispatch(setStage(stage)),
  // handleButtonClick: buttonLabel => {
  //   dispatch(handleButtonClick(buttonLabel));
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Balances);
