import React from 'react';
import AmountToPayContainer from '../containers/AmountToPayContainer';
import UserSelectionContainer from '../containers/UserSelectionContainer';
import SubmitCheckedUsersContainer from '../containers/SubmitCheckedUsersContainer';
import '../../styles/components/NewRound.scss';

function NewRound() {
  return (
    <main>
      <AmountToPayContainer />
      <section>
        <UserSelectionContainer />
      </section>
      <SubmitCheckedUsersContainer />
    </main>
  );
}

export default NewRound;
