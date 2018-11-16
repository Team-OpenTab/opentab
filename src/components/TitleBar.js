import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../../styles/components/TitleBar.scss';

function TitleBar({ title, getStage, stage, logoutUser }) {
  function balancesClassName() {
    return cx('navigation-bar__balances', {
      'navigation-bar__balances--active': stage === 'balances',
    });
  }

  function tabsClassName() {
    return cx('navigation-bar__tabs', {
      'navigation-bar__tabs--active': stage === 'tabs',
    });
  }

  return (
    <div className="title-bar-container">
      <div className="title-bar">
        <button className="title-bar__logout" type="button" onClick={logoutUser}>
          <i className="fas fa-sign-out-alt" />
        </button>
        <div className="title-bar__gap" />
        <h2 className="title-bar__title">{title}</h2>
      </div>
      <div className="navigation-bar">
        <p className={balancesClassName()} onClick={() => getStage('balances')}>
          BALANCES
        </p>
        <p className={tabsClassName()} onClick={() => getStage('tabs')}>
          TABS
        </p>
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
