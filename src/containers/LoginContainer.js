import { connect } from 'react-redux';
import Login from '../components/Login';
import {
  loginUser,
  setEmail,
  setPassword,
  createNewUser,
  setUsername,
  setUserPhone,
  setUserType,
  setValidationPassword,
} from '../actions';

const mapStateToProps = state => ({
  email: state.user.email,
  password: state.user.password,
  username: state.user.username,
  phone: state.user.phone,
  userType: state.user.userType,
  validationPassword: state.user.validationPassword,
});

const mapDispatchToProps = dispatch => ({
  getLogin: event => {
    event.preventDefault();
    dispatch(loginUser());
  },
  getEmail: email => dispatch(setEmail(email)),
  getPassword: password => dispatch(setPassword(password)),
  getNewUser: event => {
    event.preventDefault();
    dispatch(createNewUser());
  },
  getUsername: username => dispatch(setUsername(username)),
  getPhone: phone => dispatch(setUserPhone(phone)),
  getUserType: userType => dispatch(setUserType(userType)),
  getValidationPassword: validationPassword => dispatch(setValidationPassword(validationPassword)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
