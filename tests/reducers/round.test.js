import round from '../../src/reducers/round';

describe('round reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      buyerId: '',
      recipients: {},
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
      type: 'ADD_RECIPIENT',
      recipient: 2,
    };

    const expectedState = { recipients: { 2: {} } };

    const outputState = round(initialState, action);

    expect(outputState.recipients).toEqual(expectedState.recipients);
  });

  it('removes a user from array', () => {
    const initialStateWithCounterpart = Object.assign({}, initialState, { recipients: { 2: {} } });
    const action = {
      type: 'REMOVE_RECIPIENT',
      recipient: 2,
    };

    const expectedState = { recipients: {} };

    const outputState = round(initialStateWithCounterpart, action);

    expect(outputState.recipients).toEqual(expectedState.recipients);
  });
  it('resets round to initial object', () => {
    const action = {
      type: 'RESET_ROUND',
    };

    const outputState = round(initialState, action);

    expect(outputState).toEqual(initialState);
  });
});
