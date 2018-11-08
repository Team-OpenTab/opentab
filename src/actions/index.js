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

export function setAmount(totalAmount) {
  return {
    type: 'SET_AMOUNT',
    totalAmount,
  };
}

export function setStage(stage) {
  return {
    type: 'SET_STAGE',
    stage,
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

export function setNewRound() {
  return (dispatch, getState) => {
    const { round } = getState();
    fetch('/api/new-round', {
      method: 'POST',
      body: JSON.stringify(round),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .catch(error => error.log(error));
  };
}

export function fetchBalances(userId) {
  return dispatch => {
    fetch(`/api/get-balances/${userId}`)
      .then(response => response.json())
      .then(data => {
        const userBalance = Object.assign(
          {},
          {
            [userId]: Object.values(data.balances)
              .reduce((a, b) => parseInt(a) + parseInt(b))
              .toFixed(2),
          },
        );
        const userIds = Object.keys(data.balances);
        const counterpartIds = userIds.filter(key => parseInt(key) !== userId);
        const counterpartBalances = {};
        counterpartIds.map(key =>
          Object.assign(counterpartBalances, { [key]: data.balances[key] }),
        );
        dispatch(receiveUserBalance(userBalance));
        dispatch(receiveCounterpartBalances(counterpartBalances));
      });
  };
}
