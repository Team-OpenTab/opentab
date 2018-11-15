const initialState = {
  id: '',
  username: '',
  email: '',
  password: '',
  validationPassword: '',
  phone: '',
  avatar: '',
  userType: 'existingUser',
  loginError: '',
  newUserError: '',
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return Object.assign({}, state, { email: action.email });
    case 'SET_PASSWORD':
      return Object.assign({}, state, { password: action.password });
    case 'SET_USER_ID':
      return Object.assign({}, state, { id: action.id });
    case 'SET_USERNAME':
      return Object.assign({}, state, { username: action.username });
    case 'SET_USER_PHONE':
      return Object.assign({}, state, { phone: action.phone });
    case 'SET_AVATAR':
      return Object.assign({}, state, { avatar: action.avatar });
    case 'SET_USER_TYPE':
      return Object.assign({}, state, { userType: action.userType });
    case 'SET_VALIDATION_PASSWORD':
      return Object.assign({}, state, {
        validationPassword: action.validationPassword,
      });
    case 'SET_LOGIN_ERROR':
      return Object.assign({}, state, { loginError: action.loginError });
    case 'SET_NEW_USER_ERROR':
      return Object.assign({}, state, { newUserError: action.newUserError });
    case 'RESET_USER':
      return initialState;
    default:
      return state;
  }
}

export default user;
