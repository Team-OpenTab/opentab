import React from 'react';
import { shallow } from 'enzyme'; // import shallow renderer from enzyme
import NewRound from '../../src/components/NewRound';
// import NewRoundRecipient from '../../src/components/NewRoundRecipient';
import NewRoundCounterpart from '../../src/components/NewRoundCounterpart';

function setup() {
  const props = {
    totalAmount: '0.00',
    recipients: {},
    counterparts: { 1: { username: 'Test', counterpart_id: 1, sum: '-10.00' } },
    userId: 1,
    splitType: 'even',
    getNewRound: jest.fn(),
    getStage: jest.fn(),
    getAmount: jest.fn(),
    handleRoundCounterparts: jest.fn(),
    getSplitType: jest.fn(),
    getRecipientAmount: jest.fn(),
    stage: 'newRound',
    contacts: [],
    getRoundName: jest.fn(),
    resetRound: jest.fn(),
    round: {
      buyerId: '',
      roundName: '',
      recipients: {},
      totalAmount: '',
      splitType: 'even',
      roundHistory: [],
    },
    user: {},
  };

  const wrapper = shallow(<NewRound {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('NewRound component', () => {
  const { wrapper } = setup();
  it('renders contacts', () => {
    expect(wrapper.find(NewRoundCounterpart).exists()).toBe(true);
  });
  // it('dispatches handleRoundCounterparts when add/remove is clicked', () => {
  //   const event = { target: { value: 1 } };
  //   wrapper
  //     .find('.new-round__add-remove-counterpart-button')
  //     .first()
  //     .simulate('click', event.target.value);
  //   expect(props.handleRoundCounterparts).toHaveBeenCalledWith(event.target.value);
  // });
});
