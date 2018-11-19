import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../../styles/components/TitleBar.scss';

function TitleBar({ getStage, stage, logoutUser, resetRound }) {
  const tabsClasses = cx('navigation-bar__tabs', {
    'navigation-bar__tabs--active': stage === 'tabs' || stage === 'newRound',
  });
  const balancesClasses = cx('navigation-bar__balances', {
    'navigation-bar__balances--active': stage === 'balances',
  });
  const friendsClasses = cx('navigation-bar__friends', {
    'navigation-bar__friends--active': stage === 'friends',
  });

  function handleClick(event) {
    getStage(event.target.value);
    resetRound();
  }

  return (
    <div className="title-bar-container">
      <div className="title-bar">
        <button className="title-bar__logout" type="button" onClick={logoutUser}>
          <i className="fas fa-sign-out-alt" />
        </button>
        <h2 className="title-bar__title">OpenTab</h2>
      </div>
      <div className="navigation-bar">
        <button type="button" value="friends" className={friendsClasses} onClick={handleClick}>
          FRIENDS
        </button>
        <button type="button" value="balances" className={balancesClasses} onClick={handleClick}>
          BALANCES
        </button>
        <button type="button" value="tabs" className={tabsClasses} onClick={handleClick}>
          TABS
        </button>
      </div>
    </div>
  );
}

TitleBar.propTypes = {
  getStage: PropTypes.func.isRequired,
  stage: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  resetRound: PropTypes.func.isRequired,
};

export default TitleBar;
