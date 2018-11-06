import React from 'react';
import PropTypes from 'prop-types';

function UserSelection({ addRemoveCheckedUser }) {
  return (
    <ul className="user__selection">
      <li>
        <input onChange={() => addRemoveCheckedUser('Tony')} type="checkbox" />
        Tony
      </li>
      <li>
        <input onChange={() => addRemoveCheckedUser('Luke')} type="checkbox" />
        Luke
      </li>
      <li>
        <input onChange={() => addRemoveCheckedUser('Dan')} type="checkbox" />
        Dan
      </li>
      <li>
        <input onChange={() => addRemoveCheckedUser('Yetkin')} type="checkbox" />
        Yetkin
      </li>
      <li>
        <input onChange={() => addRemoveCheckedUser('David')} type="checkbox" />
        David
      </li>
    </ul>
  );
}

UserSelection.propTypes = {
  addRemoveCheckedUser: PropTypes.func,
};
export default UserSelection;
