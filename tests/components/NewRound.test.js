import React from 'react';
import { shallow } from 'enzyme'; // import shallow renderer from enzyme
import NewRound from '../../src/components/NewRound';

function setup() {
  const props = {
    totalAmount: 0,
    recipients: {},
    counterparts: { 1: { username: 'Test', counterpart_id: 1, sum: '-10.00' } },
    userId: 1,
    getNewRound: jest.fn(),
    getStage: jest.fn(),
    getAmount: jest.fn(),
    handleRoundCounterparts: jest.fn(),
    getSplitType: jest.fn(),
    getRecipientAmount: jest.fn(),
  };

  const wrapper = shallow(<NewRound {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('NewRound component', () => {
  const { wrapper, props } = setup();
  it('renders contacts', () => {
    expect(wrapper.find('.new-round__counterpart').exists()).toBe(true);
    expect(wrapper.find('.new-round__counterpart-name').text()).toBe('Test');
  });
  it('dispatches handleRoundCounterparts when add/remove is clicked', () => {
    const event = { target: { value: 1 } };
    wrapper.find('.new-round__add-remove-counterpart-button').simulate('click', event.target.value);
    expect(props.handleRoundCounterparts).toHaveBeenCalledWith(event.target.value);
  });
});
