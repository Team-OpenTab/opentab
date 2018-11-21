import React from 'react';
import { shallow } from 'enzyme'; // import shallow renderer from enzyme
import Balances from '../../src/components/Balances';

function setup() {
  const props = {
    userId: 1,
    balances: {
      userBalance: 0,
      counterpartBalances: { 5: { username: 'test', counterpart_id: '5', amount: '20.00' } },
    },
    contactSearchResults: [],
    contactSearchString: '',
    getStage: jest.fn(),
    showPayment: jest.fn(),
    payment: {},
    stage: 'balances',
    settleBalance: jest.fn(),
    fetchBalances: jest.fn(),
    handleContactSearch: jest.fn(),
    addContact: jest.fn(),
    approveContact: jest.fn(),
    fetchRoundHistory: jest.fn(),
    logoutUser: jest.fn(),
    contacts: { search: { searchString: '', searchResults: [] }, contactList: [] },
  };

  const wrapper = shallow(<Balances {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('balances component', () => {
  const { wrapper, props } = setup();
  it('calls getStage with newRound when new round button is clicked', () => {
    wrapper.find('.new-round-btn').simulate('click');
    expect(props.getStage).toHaveBeenCalledWith('newRound');
  });
});
