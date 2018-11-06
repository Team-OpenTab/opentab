import { connect } from 'react-redux';
import { addRemoveCheckedUser } from '../actions';
import UserSelection from '../components/UserSelection';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  addRemoveCheckedUser: user => dispatch(addRemoveCheckedUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSelection);
