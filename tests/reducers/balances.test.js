import balances from '../../src/reducers/balances';

describe('balances reducer', () => {
  it('adds user balance to store', () => {
    const initialState = {
      userBalance: {},
      counterpartBalances: {},
    };

    const action = {
      type: 'RECEIVE_USER_BALANCE',
      balance: { 1: '50.0' },
    };
    const expectedState = {
      userBalance: { 1: '50.0' },
      counterpartBalances: {},
    };

    const outputState = balances(initialState, action);

    expect(outputState).toEqual(expectedState);
  });
  it('adds counterpart balances to store', () => {
    const initialState = {
      userBalance: {},
      counterpartBalances: {},
    };

    const action = {
      type: 'RECEIVE_COUNTERPART_BALANCES',
      balances: { 2: 10.0, 3: 10.0 },
    };

    const expectedState = {
      userBalance: {},
      counterpartBalances: { 2: 10.0, 3: 10.0 },
    };

    const output = balances(initialState, action);
    expect(output).toEqual(expectedState);
  });
});
