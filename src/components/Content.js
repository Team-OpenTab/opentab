import React from 'react';
import PropTypes from 'prop-types';

import BalancesContainer from '../containers/BalancesContainer';
import NewRoundContainer from '../containers/NewRoundContainer';
import LoginContainer from '../containers/LoginContainer';

class Content extends React.Component {
  render() {
    const { stage } = this.props;
    return (
      <div className="app">
        {stage === 'login' && <LoginContainer />}
        {stage === 'balances' && <BalancesContainer />}
        {stage === 'newRound' && <NewRoundContainer />}
      </div>
    );
  }
}

// stage/display to be object in future
Content.propTypes = {
  stage: PropTypes.string,
  fetchBalances: PropTypes.func,
};

export default Content;
