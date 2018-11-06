import React from 'react';
import PropTypes from 'prop-types';

function SubmitCheckedUsers(checkedUsers, amount, submitCheckedUsers) {
  return (
    <button type="button" onClick={submitCheckedUsers(checkedUsers, amount)}>
      Submit
    </button>
  );
}
SubmitCheckedUsers.propTypes = {
  checkedUsers: PropTypes.array,
  amount: PropTypes.number,
  SubmitCheckedUsers: PropTypes.func,
};
export default SubmitCheckedUsers;
