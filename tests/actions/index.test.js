import {
  addCheckedUser,
  removeCheckedUser,
  resetRound,
  // handleRoundCounterparts,
  setAmount,
} from '../../src/actions/index';

describe('round actions', () => {
  it('addCheckedUser returns expected action', () => {
    const action = addCheckedUser(3);

    const expectedAction = {
      type: 'ADD_CHECKED_USER',
      counterpart: 3,
    };
    expect(action).toEqual(expectedAction);
  });
  it('removeCheckedUser returns expected action', () => {
    const action = removeCheckedUser(3);

    const expectedAction = {
      type: 'REMOVE_CHECKED_USER',
      counterpart: 3,
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
});
