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

export function receiveCounterpartBalances(balances) {
  return {
    type: 'RECEIVE_COUNTERPART_BALANCES',
    balances,
  };
}

export function receiveUserBalance(balance) {
  return {
    type: 'RECEIVE_USER_BALANCE',
    balance,
  };
}

export function fetchBalances(userId) {
  return dispatch => {
    fetch(`/api/get-balances/${userId}`)
      .then(response => response.json())
      .then(data => {
        const userBalance = Object.assign({}, { [userId]: data.balances[userId] });
        const userIds = Object.keys(data.balances);
        const counterpartIds = userIds.filter(key => parseInt(key) !== userId);
        const counterpartBalances = {};
        counterpartIds.map(key =>
          Object.assign(counterpartBalances, { [key]: data.balances[key] }),
        );
        dispatch(receiveUserBalance(userBalance));
        dispatch(receiveCounterpartBalances(counterpartBalances));
      });

export function handleButtonClick(buttonLabel) {
  return {
    type: 'BUTTON_CHANGE_STAGE',
    buttonLabel,
  };
}
