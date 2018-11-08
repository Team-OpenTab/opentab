const initialState = {
  id: '',
  username: '',
  email: '',
  password: '',
  phone: '',
  userType: 'existingUser',
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
    case 'SET_PHONE':
      return Object.assign({}, state, { phone: action.phone });
    case 'SET_USER_TYPE':
      return Object.assign({}, state, { userType: action.userType });
    default:
      return state;
  }
}

export default user;
