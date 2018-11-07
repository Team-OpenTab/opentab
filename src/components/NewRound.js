import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/NewRound.scss';

function NewRound({
  affectAmountPaid,
  amount,
  monitorCheckedUser,
  submitCheckedUsers,
  checkedUsers,
}) {
  return (
    <main>
      <input value={amount} onChange={event => affectAmountPaid(event.target.value)} />;
      <section>
        <ul className="user__selection">
          <li>
            <input onChange={() => monitorCheckedUser('Tony')} type="checkbox" />
            Tony
          </li>
          <li>
            <input onChange={() => monitorCheckedUser('Luke')} type="checkbox" />
            Luke
          </li>
          <li>
            <input onChange={() => monitorCheckedUser('Dan')} type="checkbox" />
            Dan
          </li>
          <li>
            <input onChange={() => monitorCheckedUser('Yetkin')} type="checkbox" />
            Yetkin
          </li>
          <li>
            <input onChange={() => monitorCheckedUser('David')} type="checkbox" />
            David
          </li>
        </ul>
      </section>
      <button type="button" onClick={submitCheckedUsers(checkedUsers, amount)}>
        Submit
      </button>
    </main>
  );
}
NewRound.propTypes = {
  affectAmountPaid: PropTypes.func,
  amount: PropTypes.number,
  monitorCheckedUser: PropTypes.func,
  submitCheckedUsers: PropTypes.func,
  checkedUsers: PropTypes.array,
};

export default NewRound;
