import React from 'react';
import { shallow } from 'enzyme'; // import shallow renderer from enzyme
import Login from '../../src/components/Login';

function setup(type) {
  const props = {
    email: 'test',
    password: 'test',
    username: 'test',
    phone: 'test',
    userType: type,
    validationPassword: 'test',
    getLogin: jest.fn(),
    getEmail: jest.fn(),
    getPassword: jest.fn(),
    getNewUser: jest.fn(),
    getUsername: jest.fn(),
    getPhone: jest.fn(),
    getUserType: jest.fn(),
    getValidationPassword: jest.fn(),
  };

  const wrapper = shallow(<Login {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('Login component - basic rendering of login', () => {
  const { wrapper, props } = setup('existingUser');
  it('renders without throwing error', () => {
    expect(wrapper.find('.login').exists()).toBe(true);
  });
  it('renders correct form dependent on userType prop - existingUser', () => {
    expect(wrapper.find('.login--existing-user').exists()).toBe(true);
    expect(wrapper.find('.login--new-user').exists()).toBe(false);
  });
  it('clicking no account button calls action with correct argument', () => {
    wrapper.find('.new-user-button').simulate('click');
    expect(props.getUserType).toHaveBeenCalledWith('newUser');
  });
});
describe('new user registration - basic rendering of new user registration', () => {
  const { wrapper, props } = setup('newUser');
  it('renders correct form dependent on userType prop - newUser', () => {
    // const wrapper = shallow(<Login userType="newUser" />);
    expect(wrapper.find('.login--existing-user').exists()).toBe(false);
    expect(wrapper.find('.login--new-user').exists()).toBe(true);
  });
  it('clicking `already have account` button calls action with correct argument', () => {
    // const wrapper = shallow(<Login userType="newUser" getUserType={mockGetUserType} />);
    wrapper.find('.existing-user-button').simulate('click');
    expect(props.getUserType).toHaveBeenCalledWith('existingUser');
  });
});
describe('Login component - form entry', () => {
  const { wrapper, props } = setup('existingUser');
  const event = {
    target: {
      value: 'TEST',
    },
    preventDefault: jest.fn(),
  };
  it('target value is passed as arg to getEmail function', () => {
    wrapper
      .find('.form__field')
      .at(0)
      .simulate('change', event);
    expect(props.getEmail).toHaveBeenCalledWith('TEST');
  });
  it('target value is passed as arg to getPassword function', () => {
    wrapper
      .find('.form__field')
      .at(1)
      .simulate('change', event);
    expect(props.getPassword).toHaveBeenCalledWith('TEST');
  });
  it('runs getLogin on submit', () => {
    wrapper.find('.form').simulate('submit', event);
    expect(props.getLogin).toHaveBeenCalledWith(event);
  });
});
