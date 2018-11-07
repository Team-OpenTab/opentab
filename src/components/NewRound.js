import React from 'react';
import PropTypes from 'prop-types';
import AmountToPayContainer from '../containers/AmountToPayContainer';
import UserSelectionContainer from '../containers/UserSelectionContainer';
import SubmitCheckedUsersContainer from '../containers/SubmitCheckedUsersContainer';
import TitleBar from './TitleBar';
import Button from './Button';
import '../../styles/components/NewRound.scss';

function NewRound({ handleButtonClick, goBack }) {
  return (
    <main>
      <TitleBar title="New Round" previous="balances" goBack={goBack} />
      <AmountToPayContainer />
      <section>
        <UserSelectionContainer />
      </section>
      <SubmitCheckedUsersContainer />
      <Button
        buttonLabel="Add Round"
        buttonDestination="balances"
        handleButtonClick={handleButtonClick}
      />
    </main>
  );
}

NewRound.propTypes = {
  goBack: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default NewRound;
