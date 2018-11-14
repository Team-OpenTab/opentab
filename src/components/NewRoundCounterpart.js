import React from 'react';
import PropTypes from 'prop-types';

function NewRoundCounterpart({ counterpart, recipients, handleRoundCounterparts }) {
  return (
    <div>
      {!Object.keys(recipients).includes(counterpart.counterpart_id.toString()) && (
        <div className="new-round__counterpart">
          <h3 className="new-round__counterpart-name">{counterpart.username}</h3>
          <button
            className="new-round__add-remove-counterpart-button"
            type="button"
            onClick={handleRoundCounterparts}
            value={counterpart.counterpart_id}
          >
            {!Object.keys(recipients).includes(counterpart.counterpart_id.toString())
              ? 'Add'
              : 'Remove'}
          </button>
        </div>
      )}
    </div>
  );
}

NewRoundCounterpart.propTypes = {
  counterpart: PropTypes.object.isRequired,
  recipients: PropTypes.object.isRequired,
  handleRoundCounterparts: PropTypes.func.isRequired,
};

export default NewRoundCounterpart;
