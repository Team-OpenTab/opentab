import round from '../../src/reducers/round';

describe('round reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      buyerId: '',
      recipients: {},
      totalAmount: '',
      splitType: 'even',
      roundHistory: [],
      roundName: '',
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
  it('sets round name with provided string', () => {
    const action = {
      type: 'SET_ROUND_NAME',
      roundName: 'test',
    };
    const expectedState = { roundName: 'test' };
    const outputState = round(initialState, action);
    expect(outputState.roundName).toEqual(expectedState.roundName);
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

    const expectedState = { recipients: { 2: 0 } };

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
  it('sets split type in store', () => {
    const action = {
      type: 'SET_SPLIT_TYPE',
      splitType: 'even',
    };
    const expectedState = { splitType: 'even' };
    const outputState = round(initialState, action);
    expect(outputState.splitType).toEqual(expectedState.splitType);
  });
  it('sets round history in state', () => {
    const action = {
      type: 'SET_ROUND_HISTORY',
      roundHistory: [{ roundId: 1 }],
    };
    const expectedState = { roundHistory: [{ roundId: 1 }] };
    const outputState = round(initialState, action);
    expect(outputState.roundHistory).toEqual(expectedState.roundHistory);
  });
  it('resets round to initial object', () => {
    const action = {
      type: 'RESET_ROUND',
    };

    const outputState = round(initialState, action);

    expect(outputState).toEqual(initialState);
  });
});
