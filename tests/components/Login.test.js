import React from 'react';
import { shallow } from 'enzyme'; // import shallow renderer from enzyme
import Login from '../../src/components/Login';

describe('Login component - basic rendering', () => {
  it('renders without throwing error', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('.login').exists()).toBe(true);
  });
  it('renders correct form dependent on userType prop - existingUser', () => {
    const wrapper = shallow(<Login userType="existingUser" />);
    expect(wrapper.find('.login--existing-user').exists()).toBe(true);
    expect(wrapper.find('.login--new-user').exists()).toBe(false);
  });
  it('renders correct form dependent on userType prop - newUser', () => {
    const wrapper = shallow(<Login userType="newUser" />);
    expect(wrapper.find('.login--existing-user').exists()).toBe(false);
    expect(wrapper.find('.login--new-user').exists()).toBe(true);
  });
  it('clicking no account button calls action with correct argument', () => {
    const mockGetUserType = jest.fn();
    const wrapper = shallow(<Login userType="existingUser" getUserType={mockGetUserType} />);
    wrapper.find('.new-user-button').simulate('click');
    expect(mockGetUserType).toHaveBeenCalledWith('newUser');
  });
  it('clicking `already have account` button calls action with correct argument', () => {
    const mockGetUserType = jest.fn();
    const wrapper = shallow(<Login userType="newUser" getUserType={mockGetUserType} />);
    wrapper.find('.existing-user-button').simulate('click');
    expect(mockGetUserType).toHaveBeenCalledWith('existingUser');
  });
});
describe('Login component - form entry', () => {
  const mockGetEmail = jest.fn();
  const mockGetPassword = jest.fn();
  const mockGetLogin = jest.fn();
  const wrapper = shallow(
    <Login
      userType="existingUser"
      getLogin={mockGetLogin}
      getPassword={mockGetPassword}
      getEmail={mockGetEmail}
    />,
  );
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
    expect(mockGetEmail).toHaveBeenCalledWith('TEST');
  });
  it('target value is passed as arg to getPassword function', () => {
    wrapper
      .find('.form__field')
      .at(1)
      .simulate('change', event);
    expect(mockGetPassword).toHaveBeenCalledWith('TEST');
  });
  it('runs getLogin on submit', () => {
    wrapper.find('.form').simulate('submit', event);
    expect(mockGetLogin).toHaveBeenCalledWith(event);
  });
});
