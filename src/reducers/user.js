function user(state = {}, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return Object.assign({}, state, { email: action.email });
    case 'SET_PASSWORD':
      return Object.assign({}, state, { password: action.password });
    case 'SET_USER_ID':
      return Object.assign({}, state, { id: action.id });
    case 'SET_USERNAME':
      return Object.assign({}, state, { username: action.username });
    default:
      return state;
  }
}

export default user;
