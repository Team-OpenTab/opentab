import round from '../../src/reducers/round';

describe('round reducer', () => {
  it('adds totalAmount to store', () => {
    const initialState = { userId: 1, counterpartIds: [], totalAmount: 0 };

    const action = {
      type: 'SET_AMOUNT',
      totalAmount: 50,
    };
    const expectedState = { userId: 1, counterpartIds: [], totalAmount: 50 };

    const outputState = round(initialState, action);

    expect(outputState).toEqual(expectedState);
  });
  it('adds a user to array', () => {
    const initialState = { userId: 1, counterpartIds: [], totalAmount: 0 };

    const action = {
      type: 'ADD_CHECKED_USER',
      counterpart: 2,
    };

    const expectedState = { userId: 1, counterpartIds: [2], totalAmount: 0 };

    const outputState = round(initialState, action);

    expect(outputState).toEqual(expectedState);
  });

  it('removes a user from array', () => {
    const initialState = { userId: 1, counterpartIds: [2], totalAmount: 0 };

    const action = {
      type: 'REMOVE_CHECKED_USER',
      counterpart: 2,
    };

    const expectedState = { userId: 1, counterpartIds: [], totalAmount: 0 };

    const outputState = round(initialState, action);

    expect(outputState).toEqual(expectedState);
  });
  it('resets round to initial object', () => {
    const initialState = { userId: 1, counterpartIds: [2, 3], totalAmount: 200 };

    const action = {
      type: 'RESET_ROUND',
    };

    const expectedState = { userId: 1, counterpartIds: [], totalAmount: 0 };

    const outputState = round(initialState, action);

    expect(outputState).toEqual(expectedState);
  });
});
