import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/NewRound.scss';

function NewRoundCounterpart({ counterpart, recipients, handleRoundCounterparts, contacts }) {
  return (
    <div>
      {!Object.keys(recipients).includes(counterpart.counterpart_id.toString()) && (
        <div className="new-round-counterpart-container">
          <div className="user-container">
            <img
              className="user-container__avatar"
              src={
                contacts[contacts.findIndex(x => x.contact_id === counterpart.counterpart_id)]
                  .avatar
              }
              alt="avatar"
            />
            <h3 className="user-container__name">{counterpart.username}</h3>
          </div>

          <button
            className="new-round-add-remove-btn"
            type="button"
            onClick={handleRoundCounterparts}
            value={counterpart.counterpart_id}
          >
            {!Object.keys(recipients).includes(counterpart.counterpart_id.toString()) ? '+' : '-'}
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
  contacts: PropTypes.array.isRequired,
};

export default NewRoundCounterpart;
