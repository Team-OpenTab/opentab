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
  setAvatar,
  resetUser,
} from '../actions';

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getLogin: (event) => {
    event.preventDefault();
    dispatch(loginUser());
  },
  getEmail: (email) => dispatch(setEmail(email)),
  getPassword: (password) => dispatch(setPassword(password)),
  getNewUser: (event) => {
    event.preventDefault();
    dispatch(createNewUser());
  },
  getUsername: (username) => dispatch(setUsername(username)),
  getPhone: (phone) => dispatch(setUserPhone(phone)),
  getUserType: (userType) => {
    dispatch(resetUser());
    dispatch(setUserType(userType));
  },
  getValidationPassword: (validationPassword) =>
    dispatch(setValidationPassword(validationPassword)),
  getAvatar: (avatar) => dispatch(setAvatar(avatar)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
