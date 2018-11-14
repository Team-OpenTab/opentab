import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../../styles/components/TitleBar.scss';

function TitleBar({ title, previous, getStage, stage, resetRound }) {
  function clickOnBack() {
    console.log('clicked on back: ', previous);
    getStage(previous);
    resetRound();
  }

  function clickOnMenu() {
    console.log('clicked on menu');
  }

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
        <p className="title-bar__back" onClick={() => clickOnBack()}>
          {'<'}
        </p>
        <h2 className="title-bar__title">{title}</h2>
        <p className="title-bar__menu" onClick={() => clickOnMenu()} />{' '}
      </div>
      {stage !== 'newRound' && (
        <div className="navigation-bar">
          <p className={balancesClassName()} onClick={() => getStage('balances')}>
            BALANCES
          </p>

          <p className={tabsClassName()} onClick={() => getStage('tabs')}>
            TABS
          </p>
        </div>
      )}
    </div>
  );
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  previous: PropTypes.string.isRequired,
  getStage: PropTypes.func.isRequired,
  stage: PropTypes.string.isRequired,
  resetRound: PropTypes.func.isRequired,
};

export default TitleBar;
