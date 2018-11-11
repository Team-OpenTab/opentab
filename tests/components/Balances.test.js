import React from 'react';
import { shallow } from 'enzyme'; // import shallow renderer from enzyme
import Balances from '../../src/components/Balances';

function setup() {
  const props = {
    userId: 1,
    balances: {
      userBalance: 0,
      counterpartBalances: {},
    },
    getStage: jest.fn(),
    showPayment: jest.fn(),
    payment: {},
    settleBalance: jest.fn(),
    fetchBalances: jest.fn(),
  };

  const wrapper = shallow(<Balances {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('balances component', () => {
  it('calls fetchBalances on mount', () => {
    const { props } = setup();
    expect(props.fetchBalances.mock.calls).toHaveLength(1);
  });
});
