import newRoundReducer from '../../src/reducers/newRoundReducer';

describe('new round input', () => {
  it('adds a user to array', () => {
    const initialState = { checkedUsers: [], amount: 0 };

    const action = {
      type: 'ADD_REMOVE_CHECKED_USER',
      user: 'Luke',
    };

    const expectedState = { checkedUsers: ['Luke'], amount: 0 };

    const outputState = newRoundReducer(initialState, action);

    expect(outputState).toEqual(expectedState);
  });

  it('removes a user from array', () => {
    const initialState = { checkedUsers: ['Luke'], amount: 0 };

    const action = {
      type: 'ADD_REMOVE_CHECKED_USER',
      user: 'Luke',
    };

    const expectedState = { checkedUsers: [], amount: 0 };

    const outputState = newRoundReducer(initialState, action);

    expect(outputState).toEqual(expectedState);
  });
});
