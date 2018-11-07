export function addCheckedUser(user) {
  return {
    type: 'ADD_CHECKED_USER',
    user,
  };
}

export function removeCheckedUser(user) {
  return {
    type: 'REMOVE_CHECKED_USER',
    user,
  };
}

export function monitorCheckedUser(user) {
  return (dispatch, getState) => {
    const { checkedUsers } = getState();
    return checkedUsers.includes(user)
      ? dispatch(removeCheckedUser(user))
      : dispatch(addCheckedUser(user));
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
