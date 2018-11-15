import { connect } from 'react-redux';
import Tabs from '../components/Tabs';
import { reOrder, setStage } from '../actions';

const mapStateToProps = (state) => ({
  contactList: state.contacts.contactList,
  userId: state.user.id,
  roundHistory: state.round.roundHistory,
  stage: state.stage,
});

const mapDispatchToProps = (dispatch) => ({
  reOrderRound: (round) => dispatch(reOrder(round)),
  getStage: (stage) => dispatch(setStage(stage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tabs);
