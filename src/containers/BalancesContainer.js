import { connect } from 'react-redux';
import Balances from '../components/Balances';
import { goBack, handleButtonClick } from '../actions';

const mapStateToProps = state => ({
  balances: state.balance.balances,
});

const mapDispatchToProps = dispatch => ({
  goBack: previousComponent => {
    dispatch(goBack(previousComponent));
  },
  handleButtonClick: buttonLabel => {
    dispatch(handleButtonClick(buttonLabel));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Balances);
