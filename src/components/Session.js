import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import BalancesContainer from '../containers/BalancesContainer';
import NewRoundContainer from '../containers/NewRoundContainer';
import TabsContainer from '../containers/TabsContainer';
import TitleBarContainer from '../containers/TitleBarContainer';
import FriendsContainer from '../containers/FriendsContainer';

class Session extends React.Component {
  componentDidMount() {
    this.props.fetchBalances(this.props.userId);
    this.props.fetchRoundHistory(this.props.userId);
    this.socket = io(window.location.origin);
    this.socket.on('refresh', () => {
      this.props.fetchBalances(this.props.userId);
      this.props.fetchRoundHistory(this.props.userId);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect(true);
  }

  render() {
    const { stage } = this.props;

    return (
      <div className="session">
        <TitleBarContainer />
        {stage === 'friends' && <FriendsContainer />}
        {stage === 'balances' && <BalancesContainer />}
        {stage === 'newRound' && <NewRoundContainer />}
        {stage === 'tabs' && <TabsContainer />}
      </div>
    );
  }
}

Session.propTypes = {
  stage: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  fetchBalances: PropTypes.func.isRequired,
  fetchRoundHistory: PropTypes.func.isRequired,
};

export default Session;
