import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Login.scss';

function Login({
  user,
  getLogin,
  getEmail,
  getPassword,
  getNewUser,
  getUsername,
  getPhone,
  getUserType,
  getValidationPassword,
  getAvatar,
}) {
  const {
    username,
    email,
    password,
    validationPassword,
    phone,
    avatar,
    userType,
    loginError,
    newUserError,
  } = user;

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
              onChange={(event) => getEmail(event.target.value.toLowerCase())}
              placeholder="Email"
            />
            <input
              className="form__field"
              type="password"
              value={password}
              onChange={(event) => getPassword(event.target.value)}
              placeholder="Password"
            />
            <div>{loginError}</div>
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
          <div className="logo">
            <div className="logo__container">
              <img
                className="logo__container__img"
                src="../static/images/logoPlaceholder.png"
                alt="Open Tab"
              />
            </div>
          </div>
          <form className="form" onSubmit={getNewUser}>
            <input
              className="form__field"
              type="text"
              value={email}
              onChange={(event) => getEmail(event.target.value.toLowerCase())}
              placeholder="Email*"
            />
            <input
              className="form__field"
              type="text"
              value={username}
              onChange={(event) => getUsername(event.target.value)}
              placeholder="Username*"
            />
            <input
              className="form__field"
              type="text"
              value={phone}
              onChange={(event) => getPhone(event.target.value)}
              placeholder="Phone"
            />
            <input
              className="form__field"
              type="text"
              value={avatar}
              onChange={(event) => getAvatar(event.target.value)}
              placeholder="Avatar URL"
            />
            <input
              className="form__field"
              type="password"
              value={password}
              onChange={(event) => getPassword(event.target.value)}
              placeholder="Password*"
            />
            <input
              className="form__field"
              type="password"
              value={validationPassword}
              onChange={(event) => getValidationPassword(event.target.value)}
              placeholder="Re-enter Password*"
            />
            <div>{newUserError}</div>
            <button className="form__field button" type="submit">
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
  user: PropTypes.object.isRequired,
  getLogin: PropTypes.func.isRequired,
  getEmail: PropTypes.func.isRequired,
  getPassword: PropTypes.func.isRequired,
  getNewUser: PropTypes.func.isRequired,
  getUsername: PropTypes.func.isRequired,
  getPhone: PropTypes.func.isRequired,
  getUserType: PropTypes.func.isRequired,
  getValidationPassword: PropTypes.func.isRequired,
  getAvatar: PropTypes.func.isRequired,
};

export default Login;
