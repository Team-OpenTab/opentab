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
          <form className="form" onSubmit={getLogin}>
            <label>
              {' '}
              Email:
              <input
                className="form__field"
                type="text"
                value={email}
                onChange={event => getEmail(event.target.value)}
                placeholder="Email"
              />
            </label>
            <label>
              {' '}
              Password:
              <input
                className="form__field"
                type="password"
                value={password}
                onChange={event => getPassword(event.target.value)}
                placeholder="Password"
              />
            </label>
            <button className="form__field" type="submit">
              Login
            </button>
          </form>
          <div>
            <div>No account?</div>
            <button
              className="new-user-button"
              type="button"
              onClick={() => getUserType('newUser')}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {userType === 'newUser' && (
        <div className="login--new-user">
          <form onSubmit={getNewUser}>
            <label>
              {' '}
              Email:
              <input
                type="text"
                value={email}
                onChange={event => getEmail(event.target.value)}
                placeholder="Email"
              />
            </label>
            <label>
              {' '}
              Username:
              <input
                type="text"
                value={username}
                onChange={event => getUsername(event.target.value)}
                placeholder="Username"
              />
            </label>
            <label>
              {' '}
              Phone:
              <input
                type="text"
                value={phone}
                onChange={event => getPhone(event.target.value)}
                placeholder="Phone"
              />
            </label>
            <label>
              {' '}
              Password (4 characters minimum):
              <input
                minLength="4"
                type="password"
                value={password}
                onChange={event => getPassword(event.target.value)}
                placeholder="Password"
              />
            </label>
            <label>
              {' '}
              Re-enter Password:
              <input
                type="password"
                value={validationPassword}
                onChange={event => getValidationPassword(event.target.value)}
                placeholder="Password"
              />
            </label>
            <button
              disabled={password !== validationPassword || !password || !validationPassword}
              type="submit"
            >
              Create account
            </button>
          </form>
          <div className="sign-up">
            <div>Already have an account?</div>
            <button
              className="existing-user-button"
              type="button"
              onClick={() => getUserType('existingUser')}
            >
              Sign In
            </button>
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
