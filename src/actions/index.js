export function setStage(stage) {
  return {
    type: 'SET_STAGE',
    stage,
  };
}

// USER ACTIONS

export function setUserId(id) {
  return {
    type: 'SET_USER_ID',
    id,
  };
}

export function setUsername(username) {
  return {
    type: 'SET_USERNAME',
    username,
  };
}

export function setEmail(email) {
  return {
    type: 'SET_EMAIL',
    email,
  };
}

export function setPassword(password) {
  return {
    type: 'SET_PASSWORD',
    password,
  };
}

export function setValidationPassword(validationPassword) {
  return {
    type: 'SET_VALIDATION_PASSWORD',
    validationPassword,
  };
}

export function setUserPhone(phone) {
  return {
    type: 'SET_USER_PHONE',
    phone,
  };
}

export function setUserType(userType) {
  return {
    type: 'SET_USER_TYPE',
    userType,
  };
}

export function setAvatar(avatar) {
  return {
    type: 'SET_AVATAR',
    avatar,
  };
}

export function setContactList(contactList) {
  return {
    type: 'SET_CONTACT_LIST',
    contactList,
  };
}

export function getContactList(userId) {
  return dispatch => {
    fetch(`/api/get-contacts/${userId}`)
      .then(res => res.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(setContactList(response.data));
        }
      })
      .catch(error => console.log(error));
  };
}

export function setLoginError(loginError) {
  return {
    type: 'SET_LOGIN_ERROR',
    loginError,
  };
}

export function loginUser() {
  return (dispatch, getState) => {
    const { email, password } = getState().user;
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(setUserId(response.data.id));
          dispatch(setUsername(response.data.username));
          dispatch(setUserPhone(response.data.phone));
          dispatch(getContactList(response.data.id));
          dispatch(setAvatar(response.data.avatar));
          dispatch(setStage('balances'));
        } else {
          dispatch(setLoginError(response.message));
        }
      })
      .catch(error => console.log(error));
  };
}

export function setNewUserError(newUserError) {
  return {
    type: 'SET_NEW_USER_ERROR',
    newUserError,
  };
}

export function createNewUser() {
  return (dispatch, getState) => {
    const { email, password, validationPassword, username, phone, avatar } = getState().user;
    if (!email.length || !username.length || !password.length || !validationPassword.length) {
      dispatch(setNewUserError('Please fill in all required fields'));
    } else if (!['@', '.'].some(char => email.includes(char))) {
      dispatch(setNewUserError('Incorrect e-mail address'));
    } else if (Number.isNaN(phone)) {
      dispatch(setNewUserError('Phone number should only consist of numbers'));
    } else if (password !== validationPassword) {
      dispatch(setNewUserError('Passwords do not match'));
    } else if (password.length < 4) {
      dispatch(setNewUserError('Password should be at least 4 characters long'));
    } else {
      fetch('/api/new-user', {
        method: 'POST',
        body: JSON.stringify({ email, password, username, phone, avatar }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(response => {
          if (response.status === 200) {
            dispatch(setUserId(response.data.id));
            dispatch(setStage('balances'));
          } else if (response.status === 401) {
            dispatch(setNewUserError(response.message));
          }
        })
        .catch(error => console.log(error));
    }
  };
}

// ROUND ACTIONS

export function setRoundBuyer(buyerId) {
  return {
    type: 'SET_ROUND_BUYER',
    buyerId,
  };
}

export function setNewRound() {
  return (dispatch, getState) => {
    const buyerId = getState().user.id;
    dispatch(setRoundBuyer(buyerId));
    const { round } = getState();
    fetch('/api/new-round', {
      method: 'POST',
      body: JSON.stringify(round),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .catch(error => console.log(error));
  };
}

export function addRecipient(recipient) {
  return {
    type: 'ADD_RECIPIENT',
    recipient,
  };
}

export function removeRecipient(recipient) {
  return {
    type: 'REMOVE_RECIPIENT',
    recipient,
  };
}

export function resetRound() {
  return {
    type: 'RESET_ROUND',
  };
}

export function handleRoundCounterparts(recipient) {
  return (dispatch, getState) => {
    const { recipients } = getState().round;
    if (!Object.keys(recipients).includes(recipient)) {
      dispatch(addRecipient(recipient));
    } else {
      dispatch(removeRecipient(recipient));
    }
  };
}

export function setAmount(totalAmount) {
  return {
    type: 'SET_AMOUNT',
    totalAmount,
  };
}

export function setSplitType(splitType) {
  return {
    type: 'SET_SPLIT_TYPE',
    splitType,
  };
}

export function setRecipients(recipients) {
  return {
    type: 'SET_RECIPIENT_AMOUNT',
    recipients,
  };
}

export function setRecipientAmount(id, amount) {
  return (dispatch, getState) => {
    const { recipients } = getState().round;
    const newRecipients = Object.assign({}, recipients);
    newRecipients[id] = parseFloat(amount);
    const totalAmount = Object.values(newRecipients)
      .reduce((a, b) => a + b)
      .toFixed(2);
    dispatch(setAmount(totalAmount));
    dispatch(setRecipients(newRecipients));
  };
}

export function refreshRecipientAmounts() {
  return (dispatch, getState) => {
    const { recipients, totalAmount, splitType } = getState().round;
    if (splitType === 'even') {
      const newRecipients = Object.assign({}, recipients);
      Object.keys(newRecipients).forEach(recipientId => {
        newRecipients[recipientId] = totalAmount / Object.keys(newRecipients).length;
      });
      dispatch(setRecipients(newRecipients));
    }
  };
}

// BALANCES ACTIONS

export function setCounterpartBalances(balances) {
  return {
    type: 'SET_COUNTERPART_BALANCES',
    balances,
  };
}

export function setUserBalance(balance) {
  return {
    type: 'SET_USER_BALANCE',
    balance,
  };
}

export function fetchBalances(userId) {
  return dispatch => {
    fetch(`/api/get-balances/${userId}`)
      .then(res => res.json())
      .then(response => {
        if (response.status === 200) {
          const userBalance = Object.values(response.data.balances)
            .map(item => parseFloat(item.sum))
            .reduce((a, b) => a + b);
          const userIds = Object.keys(response.data.balances);
          const counterpartIds = userIds.filter(key => parseInt(key) !== userId);
          const counterpartBalances = {};
          counterpartIds.map(key =>
            Object.assign(counterpartBalances, { [key]: response.data.balances[key] }),
          );
          dispatch(setUserBalance(userBalance));
          dispatch(setCounterpartBalances(counterpartBalances));
        } else if (response.status === 404) {
          dispatch(setUserBalance(0));
          dispatch(setCounterpartBalances({}));
        }
      });
  };
}

// TODO: use values from state instead of hard coded values. Test with newest database version
export function settleBalance() {
  return (dispatch, getState) => {
    const payerId = getState().user.id;
    const { receiverId } = getState().payment;
    const amount = Number(
      getState().balances.counterpartBalances[getState().payment.receiverId].sum,
    );
    const pay = { payerId, receiverId, amount };
    fetch('/api/make-payment', {
      method: 'POST',
      body: JSON.stringify(pay),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .catch(error => console.log(error));
  };
}

export function showPayment(payment, receiverId) {
  return {
    type: 'SHOW_PAYMENT',
    payment,
    receiverId,
  };
}

// CONTACTS ACTIONS

export function resetContactSearch() {
  return {
    type: 'RESET_CONTACT_SEARCH',
  };
}

export function setContactSearchString(text) {
  return {
    type: 'SET_CONTACT_SEARCH_STRING',
    text,
  };
}

export function setContactSearchResults(results) {
  return {
    type: 'SET_CONTACT_SEARCH_RESULTS',
    results,
  };
}

export function resetContactSearchResults() {
  return {
    type: 'RESET_CONTACT_SEARCH_RESULTS',
  };
}

export function handleContactSearch(text) {
  return (dispatch, getState) => {
    dispatch(setContactSearchString(text));
    if (text.length > 2) {
      fetch(`/api/get-contact/${text}`)
        .then(res => res.json())
        .then(response => {
          if (response.status === 200) {
            const contactList = getState().contacts.contactList.map(contact => contact.contact_id);
            const userId = getState().user.id;
            const searchResults = response.data.user;
            const filteredSearchResults = searchResults.filter(
              result => result.id !== userId && !contactList.includes(result.id),
            );
            dispatch(setContactSearchResults(filteredSearchResults));
          } else {
            dispatch(resetContactSearchResults());
          }
        });
    } else {
      dispatch(resetContactSearchResults());
    }
  };
}

export function addContact(contactId) {
  return (dispatch, getState) => {
    const userId = getState().user.id;
    fetch('/api/add-contact', {
      method: 'POST',
      body: JSON.stringify({ userId, contactId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchBalances(userId));
          dispatch(resetContactSearch());
        }
      });
  };
}
