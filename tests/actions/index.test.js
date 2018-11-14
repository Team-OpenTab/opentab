import {
  addRecipient,
  removeRecipient,
  resetRound,
  setAmount,
  setRoundBuyer,
  setSplitType,
  setCounterpartBalances,
  setUserBalance,
  setContactSearchString,
  setContactSearchResults,
  resetContactSearch,
  resetContactSearchResults,
  setStage,
  setUserId,
  setUsername,
  setEmail,
  setPassword,
  setValidationPassword,
  setAvatar,
  setUserPhone,
  setUserType,
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

describe('contacts actions', () => {
  it('setContactSearchString returns expected action', () => {
    const action = setContactSearchString('tes');
    const expectedAction = {
      type: 'SET_CONTACT_SEARCH_STRING',
      text: 'tes',
    };
    expect(action).toEqual(expectedAction);
  });
  it('setContactSearchResults returns expected action', () => {
    const action = setContactSearchResults([]);
    const expectedAction = {
      type: 'SET_CONTACT_SEARCH_RESULTS',
      results: [],
    };
    expect(action).toEqual(expectedAction);
  });
  it('resetContactSearch returns expected action', () => {
    const action = resetContactSearch();
    const expectedAction = {
      type: 'RESET_CONTACT_SEARCH',
    };
    expect(action).toEqual(expectedAction);
  });
  it('resetContactSearchResults returns expected action', () => {
    const action = resetContactSearchResults();
    const expectedAction = {
      type: 'RESET_CONTACT_SEARCH_RESULTS',
    };
    expect(action).toEqual(expectedAction);
  });
});

describe('display/stage actions', () => {
  it('setStage returns expected action', () => {
    const action = setStage('balances');
    const expectedAction = {
      type: 'SET_STAGE',
      stage: 'balances',
    };
    expect(action).toEqual(expectedAction);
  });
});

describe('user actions', () => {
  it('setUserId returns expected action', () => {
    const action = setUserId(1);
    const expectedAction = {
      type: 'SET_USER_ID',
      id: 1,
    };
    expect(action).toEqual(expectedAction);
  });
  it('setUsername returns expected action', () => {
    const action = setUsername('test');
    const expectedAction = {
      type: 'SET_USERNAME',
      username: 'test',
    };
    expect(action).toEqual(expectedAction);
  });
  it('setEmail returns expected action', () => {
    const action = setEmail('test@test.com');
    const expectedAction = {
      type: 'SET_EMAIL',
      email: 'test@test.com',
    };
    expect(action).toEqual(expectedAction);
  });
  it('setPassword returns expected action', () => {
    const action = setPassword('pet_name1234');
    const expectedAction = {
      type: 'SET_PASSWORD',
      password: 'pet_name1234',
    };
    expect(action).toEqual(expectedAction);
  });
  it('setValidationPassword returns expected action', () => {
    const action = setValidationPassword('pet_name1234');
    const expectedAction = {
      type: 'SET_VALIDATION_PASSWORD',
      validationPassword: 'pet_name1234',
    };
    expect(action).toEqual(expectedAction);
  });
  it('setUserPhone returns expected action', () => {
    const action = setUserPhone('07777');
    const expectedAction = {
      type: 'SET_USER_PHONE',
      phone: '07777',
    };
    expect(action).toEqual(expectedAction);
  });
  it('setUserType returns expected action', () => {
    const action = setUserType('newUser');
    const expectedAction = {
      type: 'SET_USER_TYPE',
      userType: 'newUser',
    };
    expect(action).toEqual(expectedAction);
  });
  it('setAvatar returns expected action', () => {
    const action = setAvatar('test.com/meme.jpg');
    const expectedAction = {
      type: 'SET_AVATAR',
      avatar: 'test.com/meme.jpg',
    };
    expect(action).toEqual(expectedAction);
  });
});
