import React from 'react';
import '../../styles/components/App.scss';
import PropTypes from 'prop-types';
import BalancesContainer from '../containers/BalancesContainer';
import NewRoundContainer from '../containers/NewRoundContainer';
import LoginContainer from '../containers/LoginContainer';
import TabsContainer from '../containers/TabsContainer';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { store } = this.context;
    const reduxState = store.getState();

    this.state = {
      stage: reduxState.stage,
    };
  }

  componentDidMount() {
    const { store } = this.context;
    store.subscribe(() => {
      this.updateFromStore();
    });
  }

  updateFromStore() {
    const { store } = this.context;
    const reduxState = store.getState();
    this.setState({
      stage: reduxState.stage,
    });
  }

  render() {
    const { stage } = this.state;

    return (
      <div className="app">
        {stage === 'login' && <LoginContainer />}
        {stage === 'balances' && <BalancesContainer />}
        {stage === 'newRound' && <NewRoundContainer />}
        {stage === 'tabs' && <TabsContainer />}
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object,
};

export default App;
