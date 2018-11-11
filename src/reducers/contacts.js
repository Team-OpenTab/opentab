const initialState = {
  search: {
    searchString: '',
    searchResults: [],
  },
  contactList: [],
};

function contacts(state = initialState, action) {
  switch (action.type) {
    case 'SET_CONTACT_SEARCH_STRING':
      return Object.assign({}, state, {
        search: Object.assign({}, state.search, { searchString: action.text }),
      });
    case 'SET_CONTACT_SEARCH_RESULTS':
      return Object.assign({}, state, {
        search: Object.assign({}, state.search, { searchResults: action.results }),
      });
    case 'RESET_CONTACT_SEARCH_RESULTS':
      return Object.assign({}, state, {
        search: Object.assign({}, state.search, { searchResults: [] }),
      });
    case 'RESET_CONTACT_SEARCH':
      return Object.assign({}, state, { search: { searchString: '', searchResults: [] } });
    default:
      return state;
  }
}

export default contacts;
