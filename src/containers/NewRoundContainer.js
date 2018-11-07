import { connect } from 'react-redux';
import NewRound from '../components/NewRound';
import { goBack, handleButtonClick } from '../actions';

const mapStateToProps = () => ({});

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
)(NewRound);
