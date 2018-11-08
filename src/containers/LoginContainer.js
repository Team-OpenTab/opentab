import { connect } from 'react-redux';
import Login from '../components/Login';
import { loginUser, setEmail, setPassword } from '../actions';

const mapStateToProps = state => ({
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = dispatch => ({
  getLogin: event => {
    event.preventDefault();
    dispatch(loginUser());
  },
  getEmail: email => dispatch(setEmail(email)),
  getPassword: password => dispatch(setPassword(password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
