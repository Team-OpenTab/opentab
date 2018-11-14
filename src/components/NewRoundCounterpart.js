import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/NewRoundCounterpart.scss';

function NewRoundCounterpart({ counterpart, recipients, handleRoundCounterparts, contacts }) {
  // console.log(contacts[counterpart.counterpart_id].avatar);
  console.log('@', contacts.findIndex(x => x.contact_id === 5));
  return (
    <div>
      {!Object.keys(recipients).includes(counterpart.counterpart_id.toString()) && (
        <div className="new-round-counterpart-container">
          <div className="counterpart-contact">
            <img
              className="counterpart-contact__avatar"
              src={
                contacts[contacts.findIndex(x => x.contact_id === counterpart.counterpart_id)]
                  .avatar
              }
              alt="avatar"
            />
            <h3 className="counterpart-contact__name">{counterpart.username}</h3>
          </div>

          <button
            className="new-round-counterpart-btn"
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
