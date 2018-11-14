import {
  addRecipient,
  removeRecipient,
  resetRound,
  setAmount,
  setRoundBuyer,
  setSplitType,
  setCounterpartBalances,
  setUserBalance,
} from '../../src/actions/index';

describe('round actions', () => {
  it('addRecipient returns expected action', () => {
    const action = addRecipient(3);

    const expectedAction = {
      type: 'ADD_RECIPIENT',
      recipient: 3,
    };
    expect(action).toEqual(expectedAction);
  });
  it('removeRecipient returns expected action', () => {
    const action = removeRecipient(3);

    const expectedAction = {
      type: 'REMOVE_RECIPIENT',
      recipient: 3,
    };

    expect(action).toEqual(expectedAction);
  });
  it('resetRound returns expected action', () => {
    const action = resetRound();

    const expectedAction = {
      type: 'RESET_ROUND',
    };

    expect(action).toEqual(expectedAction);
  });
  it('setAmount returns expected action', () => {
    const action = setAmount(50);
    const expectedAction = {
      type: 'SET_AMOUNT',
      totalAmount: 50,
    };
    expect(action).toEqual(expectedAction);
  });
  it('setRoundBuyer returns expected action', () => {
    const action = setRoundBuyer(1);
    const expectedAction = {
      type: 'SET_ROUND_BUYER',
      buyerId: 1,
    };
    expect(action).toEqual(expectedAction);
  });
  it('setSplitType returns expected action', () => {
    const action = setSplitType('even');
    const expectedAction = {
      type: 'SET_SPLIT_TYPE',
      splitType: 'even',
    };
    expect(action).toEqual(expectedAction);
  });
  // it('setRecipients returns expected action', () => {
  //   const action = setRecipients()
  // })
});

describe('balances actions', () => {
  it('setCounterpartBalances returns expected action', () => {
    const action = setCounterpartBalances({});
    const expectedAction = {
      type: 'SET_COUNTERPART_BALANCES',
      balances: {},
    };
    expect(action).toEqual(expectedAction);
  });
  it('setUserBalance returns expected action', () => {
    const action = setUserBalance(52.0);
    const expectedAction = {
      type: 'SET_USER_BALANCE',
      balance: 52.0,
    };
    expect(action).toEqual(expectedAction);
  });
});
