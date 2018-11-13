import { connect } from 'react-redux';
import Tabs from '../components/Tabs';
import reOrderRound from '../actions';

const mapStateToProps = state => ({
  contacts: state.contacts,
  userId: state.userId,
  roundHistory: state.round.roundHistory,
});

const mapDispatchToProps = dispatch => ({
  reOrderRound: round => dispatch(reOrderRound(round)),
});

export default connect({ mapStateToProps, mapDispatchToProps })(Tabs);
