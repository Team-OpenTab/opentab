import React from 'react';
import '../../styles/components/App.scss';
import PropTypes from 'prop-types';
import LoginContainer from '../containers/LoginContainer';
import SessionContainer from '../containers/SessionContainer';

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
        {stage !== 'login' && <SessionContainer />}
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object,
};

export default App;
