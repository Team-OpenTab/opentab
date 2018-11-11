const initialState = {
  searchString: '',
  searchResults: [],
};

function contacts(state = initialState, action) {
  switch (action.type) {
    case 'SET_CONTACT_SEARCH_STRING':
      return Object.assign({}, state, { searchString: action.text });
    case 'SET_CONTACT_SEARCH_RESULTS':
      return Object.assign({}, state, { searchResults: action.results });
    case 'RESET_CONTACT_SEARCH_RESULTS':
      return Object.assign({}, state, { searchResults: [] });
    case 'RESET_CONTACT_SEARCH':
      return Object.assign({}, state, { searchString: '', searchResults: [] });
    default:
      return state;
  }
}

export default contacts;
