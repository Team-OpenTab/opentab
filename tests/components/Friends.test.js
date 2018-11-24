import React from 'react';
import { shallow } from 'enzyme'; // import shallow renderer from enzyme
import Friends from '../../src/components/Friends';

function setUp() {
  const props = {
    balances: {
      userBalance: -20,
      counterpartBalances: {},
    },
    approveContact: jest.fn(),
    handleContactSearch: jest.fn(),
    addContact: jest.fn(),
    user: {
      id: 19,
      username: 'testman',
      email: 'testman@email.com',
      password: 'test',
      validationPassword: 'test',
      phone: '3333333333333',
      avatar: '" onClick="alert(test)',
      userType: 'newUser',
      loginError: '',
      newUserError: '',
    },
    payment: {
      payment: false,
      receiverId: 0,
    },
    contacts: {
      search: {
        searchString: '',
        searchResults: [],
      },
      contactList: [
        {
          contact_id: 1,
          username: 'Yetkin',
          email: 'yetkin@gmail.com',
          phone: '07998777666',
          avatar: 'https://avatars0.githubusercontent.com/u/42815334?s=400&v=4',
          approved: false,
        },
        {
          contact_id: 3,
          username: 'Dan',
          email: 'dan@gmail.com',
          phone: '07998444333',
          avatar: 'https://avatars2.githubusercontent.com/u/38405106?s=400&v=4',
          approved: true,
        },
      ],
    },
  };

  const wrapper = shallow(<Friends {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('friends component', () => {
  const { wrapper, props } = setUp();
  it('renders approve button if contact friend request is not approved', () => {
    expect(wrapper.find('.friend-container__approve-btn').exists()).toBe(true);
  });
  it('calls approveContact when approve button is clicked', () => {
    wrapper.find('.friend-container__approve-btn').simulate('click');
    expect(props.approveContact).toHaveBeenCalledWith(props.contacts.contactList[0].contact_id);
  });
  it('does not render approve button when contact has been approved', () => {
    wrapper.setProps({
      friendRequests: [],
    });
    expect(wrapper.find('.approve-btn').exists()).toBe(false);
  });
});
