import contacts from '../../src/reducers/contacts';

describe('contacts reducer', () => {
  const initialState = {
    search: {
      searchString: '',
      searchResults: [],
    },
    contactList: [],
  };
  it('sets contact list in state', () => {
    const action = {
      type: 'SET_CONTACT_LIST',
      contactList: [
        {
          contact_id: 1,
          username: 'Yetkin',
          email: 'yetkin@gmail.com',
          phone: '07998777666',
          avatar: 'https://avatars0.githubusercontent.com/u/42815334?s=400&v=4',
          approved: true,
        },
      ],
    };
    const expectedState = {
      contactList: [
        {
          contact_id: 1,
          username: 'Yetkin',
          email: 'yetkin@gmail.com',
          phone: '07998777666',
          avatar: 'https://avatars0.githubusercontent.com/u/42815334?s=400&v=4',
          approved: true,
        },
      ],
    };
    const output = contacts(initialState, action);
    expect(output.contactList).toEqual(expectedState.contactList);
  });
  it('sets contact search string in store', () => {
    const action = {
      type: 'SET_CONTACT_SEARCH_STRING',
      text: 'dan',
    };
    const expectedState = {
      search: {
        searchString: 'dan',
        searchResults: [],
      },
    };

    const output = contacts(initialState, action);
    expect(output.search).toEqual(expectedState.search);
  });
  it('sets contact search results', () => {
    const action = {
      type: 'SET_CONTACT_SEARCH_RESULTS',
      results: [
        {
          id: 17,
          username: 'testxssthanks',
          avatar: '" onclick="alert("hello")" id="',
          email: 'tryin2hack@email.com',
        },
      ],
    };
    const expectedState = {
      searchResults: [
        {
          id: 17,
          username: 'testxssthanks',
          avatar: '" onclick="alert("hello")" id="',
          email: 'tryin2hack@email.com',
        },
      ],
    };
    const output = contacts(initialState, action);
    expect(output.search.searchResults).toEqual(expectedState.searchResults);
  });
  it('resets contact search results', () => {
    const action = {
      type: 'RESET_CONTACT_SEARCH_RESULTS',
    };
    const outputState = contacts(initialState, action);
    expect(outputState.search.searchResults).toEqual(initialState.search.searchResults);
  });
  it('resets contact search string', () => {
    const action = {
      type: 'RESET_CONTACT_SEARCH_STRING',
    };
    const outputState = contacts(initialState, action);
    expect(outputState.search.searchString).toEqual(initialState.search.searchString);
  });
  it('resets contacts', () => {
    const action = {
      type: 'RESET_CONTACTS',
    };
    const outputState = contacts(initialState, action);
    expect(outputState.search).toEqual(initialState.search);
  });
});
