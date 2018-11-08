import React from 'react';
import PropTypes from 'prop-types';

function Login({ email, password, getLogin, getEmail, getPassword }) {
  return (
    <div>
      <form onSubmit={getLogin}>
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
          Password:
          <input
            type="password"
            value={password}
            onChange={event => getPassword(event.target.value)}
            placeholder="Password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  getLogin: PropTypes.func.isRequired,
  getEmail: PropTypes.func.isRequired,
  getPassword: PropTypes.func.isRequired,
};

export default Login;
