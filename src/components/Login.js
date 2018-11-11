import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Login.scss';

function Login({
  email,
  password,
  phone,
  username,
  userType,
  validationPassword,
  getLogin,
  getEmail,
  getPassword,
  getNewUser,
  getUsername,
  getPhone,
  getUserType,
  getValidationPassword,
}) {
  return (
    <div className="login">
      {userType === 'existingUser' && (
        <div className="container login--existing-user">
          <div className="logo">
            <div className="logo__container">
              <img
                className="logo__container__img"
                src="../static/images/logoPlaceholder.png"
                alt="Open Tab"
              />
            </div>
          </div>
          <form className="form" onSubmit={getLogin}>
            <input
              className="form__field"
              type="text"
              value={email}
              onChange={event => getEmail(event.target.value)}
              placeholder="Email"
            />
            <input
              className="form__field"
              type="password"
              value={password}
              onChange={event => getPassword(event.target.value)}
              placeholder="Password"
            />
            <button className="form__field button" type="submit">
              LOGIN
            </button>
          </form>
          <div className="sign-up">
            <p className="new-user-button" type="button" onClick={() => getUserType('newUser')}>
              No account? Sign up now.
            </p>
          </div>
        </div>
      )}

      {userType === 'newUser' && (
        <div className="container login--new-user">
          <form className="form" onSubmit={getNewUser}>
            <input
              className="form__field"
              type="text"
              value={email}
              onChange={event => getEmail(event.target.value)}
              placeholder="Email"
              required="required"
            />
            <input
              className="form__field"
              type="text"
              value={username}
              onChange={event => getUsername(event.target.value)}
              placeholder="Username"
            />
            <input
              className="form__field"
              type="text"
              value={phone}
              onChange={event => getPhone(event.target.value)}
              placeholder="Phone"
            />
            <input
              className="form__field"
              minLength="4"
              type="password"
              value={password}
              onChange={event => getPassword(event.target.value)}
              placeholder="Password"
            />
            <input
              className="form__field"
              type="password"
              value={validationPassword}
              onChange={event => getValidationPassword(event.target.value)}
              placeholder="Password"
            />
            <button
              className="form__field button"
              disabled={password !== validationPassword || !password || !validationPassword}
              type="submit"
            >
              CREATE ACCOUNT
            </button>
          </form>
          <div className="sign-up">
            <p
              className="existing-user-button"
              type="button"
              onClick={() => getUserType('existingUser')}
            >
              Already have an account? Sign in.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  validationPassword: PropTypes.string.isRequired,
  getLogin: PropTypes.func.isRequired,
  getEmail: PropTypes.func.isRequired,
  getPassword: PropTypes.func.isRequired,
  getNewUser: PropTypes.func.isRequired,
  getUsername: PropTypes.func.isRequired,
  getPhone: PropTypes.func.isRequired,
  getUserType: PropTypes.func.isRequired,
  getValidationPassword: PropTypes.func.isRequired,
};

export default Login;
