import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../../styles/components/TitleBar.scss';

function TitleBar({ getStage, stage, logoutUser }) {
  const tabsClasses = cx('navigation-bar__tabs', {
    'navigation-bar__tabs--active': stage === 'tabs',
  });
  const balancesClasses = cx('navigation-bar__balances', {
    'navigation-bar__balances--active': stage === 'balances',
  });
  const friendsClasses = cx('navigation-bar__friends', {
    'navigation-bar__friends--active': stage === 'friends',
  });

  return (
    <div className="title-bar-container">
      <div className="title-bar">
        <button className="title-bar__logout" type="button" onClick={logoutUser}>
          <i className="fas fa-sign-out-alt" />
        </button>
        <h2 className="title-bar__title">OpenTab</h2>
      </div>
      <div className="navigation-bar">
        <button type="button" className={friendsClasses} onClick={() => getStage('friends')}>
          FRIENDS
        </button>
        <button type="button" className={balancesClasses} onClick={() => getStage('balances')}>
          BALANCES
        </button>
        <button type="button" className={tabsClasses} onClick={() => getStage('tabs')}>
          TABS
        </button>
      </div>
    </div>
  );
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  previous: PropTypes.string.isRequired,
  getStage: PropTypes.func.isRequired,
  stage: PropTypes.string.isRequired,
  logoutUser: PropTypes.func,
};

export default TitleBar;
