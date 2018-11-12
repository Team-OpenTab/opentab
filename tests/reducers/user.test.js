import user from '../../src/reducers/user';

describe('user reducer', () => {
  const initialState = {
    id: '',
    username: '',
    email: '',
    password: '',
    validationPassword: '',
    phone: '',
    userType: 'existingUser',
  };
  it('sets email in state', () => {
    const action = {
      type: 'SET_EMAIL',
      email: 'test@test.com',
    };
    const expectedState = {
      email: 'test@test.com',
    };

    const outputState = user(initialState, action);

    expect(outputState.email).toEqual(expectedState.email);
  });
  it('sets password in state', () => {
    const action = {
      type: 'SET_PASSWORD',
      password: 'a_pets_name',
    };
    const expectedState = {
      password: 'a_pets_name',
    };

    const outputState = user(initialState, action);

    expect(outputState.password).toEqual(expectedState.password);
  });
  it('sets user id in state', () => {
    const action = {
      type: 'SET_USER_ID',
      id: 1,
    };

    const expectedState = {
      id: 1,
    };

    const outputState = user(initialState, action);

    expect(outputState.id).toEqual(expectedState.id);
  });
  it('sets username in state', () => {
    const action = {
      type: 'SET_USERNAME',
      username: 'test',
    };

    const expectedState = {
      username: 'test',
    };

    const outputState = user(initialState, action);

    expect(outputState.username).toEqual(expectedState.username);
  });
  it('sets phone number in state', () => {
    const action = {
      type: 'SET_USER_PHONE',
      phone: '073 5714 9757',
    };

    const expectedState = {
      phone: '073 5714 9757',
    };

    const outputState = user(initialState, action);

    expect(outputState.phone).toEqual(expectedState.phone);
  });
  it('sets user type in state', () => {
    const action = {
      type: 'SET_USER_TYPE',
      userType: 'newUser',
    };

    const expectedState = {
      userType: 'newUser',
    };

    const outputState = user(initialState, action);

    expect(outputState.userType).toEqual(expectedState.userType);
  });
  it('sets validation password in state', () => {
    const action = {
      type: 'SET_VALIDATION_PASSWORD',
      validationPassword: 'a_pets_name',
    };
    const expectedState = {
      validationPassword: 'a_pets_name',
    };

    const outputState = user(initialState, action);

    expect(outputState.validationPassword).toEqual(expectedState.validationPassword);
  });
});
