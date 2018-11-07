import React from 'react';
import PropTypes from 'prop-types';

function TitleBar({ title, previous }) {
  function clickOnBack() {
    console.log('clicked on back: ', previous);
  }

  function clickOnMenu() {
    console.log('clicked on menu');
  }

  return (
    <div className="title-bar">
      <p className="title-bar__back" onClick={() => clickOnBack()}>
        Back
      </p>
      <h2 className="title-bar__title">{title}</h2>
      <p className="title-bar__menu" onClick={() => clickOnMenu()}>
        menu
      </p>
    </div>
  );
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  previous: PropTypes.string.isRequired,
};

export default TitleBar;
