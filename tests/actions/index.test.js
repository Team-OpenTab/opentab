import { addRecipient, removeRecipient, resetRound, setAmount } from '../../src/actions/index';

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
});
