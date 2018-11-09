import React from 'react';
import PropTypes from 'prop-types';

function NewRoundCounterpart({ counterpart }) {
  return (
    <div>
      <h3>{counterpart.username}</h3>
    </div>
  );
}

NewRoundCounterpart.propTypes = {
  counterpart: PropTypes.object,
};

export default NewRoundCounterpart;
