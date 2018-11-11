import round from '../../src/reducers/round';

describe('round reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      roundId: '',
      buyerId: '',
      counterpartIds: [],
      totalAmount: 0,
      splitType: '',
    };
  });
  it('sets round buyer with provided userId', () => {
    const action = {
      type: 'SET_ROUND_BUYER',
      buyerId: 1,
    };
    const expectedState = { buyerId: 1 };

    const outputState = round(initialState, action);
    expect(outputState.buyerId).toEqual(expectedState.buyerId);
  });
  it('adds totalAmount to store', () => {
    const action = {
      type: 'SET_AMOUNT',
      totalAmount: 50,
    };
    const expectedState = { totalAmount: 50 };

    const outputState = round(initialState, action);

    expect(outputState.totalAmount).toEqual(expectedState.totalAmount);
  });
  it('adds a user to array', () => {
    const action = {
      type: 'ADD_CHECKED_USER',
      counterpart: 2,
    };

    const expectedState = { counterpartIds: [2] };

    const outputState = round(initialState, action);

    expect(outputState.counterpartIds).toEqual(expectedState.counterpartIds);
  });

  it('removes a user from array', () => {
    const initialStateWithCounterpart = Object.assign({}, initialState, { counterpartIds: [2] });
    const action = {
      type: 'REMOVE_CHECKED_USER',
      counterpart: 2,
    };

    const expectedState = { counterpartIds: [] };

    const outputState = round(initialStateWithCounterpart, action);

    expect(outputState.counterpartIds).toEqual(expectedState.counterpartIds);
  });
  it('resets round to initial object', () => {
    const action = {
      type: 'RESET_ROUND',
    };

    const outputState = round(initialState, action);

    expect(outputState).toEqual(initialState);
  });
});
