import React from 'react';
import { shallow } from 'enzyme'; // import shallow renderer from enzyme
import BalanceItem from '../../src/components/BalanceItem';

function setup() {
  const props = {
    contactId: '1',
    contact: {
      counterpartId: 1,
      sum: '-10.00',
      username: 'test',
    },
    friendRequests: [1],
    approveContact: jest.fn(),
    showPayment: jest.fn(),
  };
  const wrapper = shallow(<BalanceItem {...props} />);

  return {
    props,
    wrapper,
  };
}
describe('BalanceItem component', () => {
  const { wrapper, props } = setup();
  it('renders name of contact', () => {
    expect(wrapper.find('.counterpart__name').text()).toBe('test');
  });
  it('renders balance of contact correctly - contact owes user', () => {
    const owedBalance = wrapper.find('.counterpart__balance--green');
    expect(owedBalance.exists()).toBe(true);
    expect(owedBalance.text()).toContain('10.00');
  });
  it('renders approve button if contact friend request is not approved', () => {
    expect(wrapper.find('.approve-btn').exists()).toBe(true);
  });
  it('calls approveContact when approve button is clicked', () => {
    wrapper.find('.approve-btn').simulate('click');
    expect(props.approveContact).toHaveBeenCalledWith(props.contactId);
  });
  it('does not render approve button when contact has been approved', () => {
    wrapper.setProps({
      friendRequests: [],
    });
    expect(wrapper.find('.approve-btn').exists()).toBe(false);
  });
  it('renders balance of contact correctly - user owes contact', () => {
    wrapper.setProps({
      contact: {
        counterpartId: 2,
        sum: '10.00',
        username: 'test',
      },
    });
    const owedBalance = wrapper.find('.counterpart__balance--red');
    expect(owedBalance.exists()).toBe(true);
  });
  it('renders options button if there is an unsettled balance', () => {
    expect(wrapper.find('.pay-btn').exists()).toBe(true);
  });
  it('calls showPayment when options button is clicked', () => {
    wrapper.find('.pay-btn').simulate('click');
    expect(props.showPayment).toHaveBeenCalled();
  });
  it('does not render options button if balance is settled', () => {
    wrapper.setProps({
      contact: {
        counterpartId: 2,
        sum: '0.00',
        username: 'test',
      },
    });
    expect(wrapper.find('.pay-btn').exists()).toBe(false);
  });
});
