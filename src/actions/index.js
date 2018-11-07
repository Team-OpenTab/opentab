export function addRemoveCheckedUser(user) {
  return {
    type: 'ADD_REMOVE_CHECKED_USER',
    user,
  };
}

export function storeCheckedUsersFinal(users) {
  return {
    type: 'STORE_USERS_FINAL',
    users,
  };
}

export function storeInputtedAmount(amount) {
  return {
    type: 'STORE_INPUTTED_AMOUNT',
    amount,
  };
}

export function goBack(previousComponent) {
  return {
    type: 'GO_BACK',
    previousComponent,
  };
}

export function handleButtonClick(buttonLabel) {
  return {
    type: 'BUTTON_CHANGE_STAGE',
    buttonLabel,
  };
}
