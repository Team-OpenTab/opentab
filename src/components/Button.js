import React from 'react';
import PropTypes from 'prop-types';

function Button({ buttonLabel, handleButtonClick, buttonDestination }) {
  function clickOnButton() {
    console.log('button click');
    handleButtonClick(buttonDestination);
  }
  return (
    <button className="button" type="submit" onClick={() => clickOnButton()}>
      {buttonLabel}
    </button>
  );
}

Button.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  buttonDestination: PropTypes.string.isRequired,
};

export default Button;
