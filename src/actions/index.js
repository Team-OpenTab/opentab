// STAGE ACTIONS

/* Sets view stage ('login' or 'session') to store, to trigger a view change. */
export function setStage(stage) {
  return {
    type: 'SET_STAGE',
    stage,
  };
}

// USER ACTIONS

/* Sets user ID to store. */
export function setUserId(id) {
  return {
    type: 'SET_USER_ID',
    id,
  };
}

/* Sets the user's username to store. */
export function setUsername(username) {
  return {
    type: 'SET_USERNAME',
    username,
  };
}

/* Sets the user's email to store. */
export function setEmail(email) {
  return {
    type: 'SET_EMAIL',
    email,
  };
}

/* Sets the user's password to store. */
export function setPassword(password) {
  return {
    type: 'SET_PASSWORD',
    password,
  };
}

/*  Sets another version of the user's password to store.
Used to validate a user's password when they create an account. */
export function setValidationPassword(validationPassword) {
  return {
    type: 'SET_VALIDATION_PASSWORD',
    validationPassword,
  };
}

/* Sets the user's phone number to store. */
export function setUserPhone(phone) {
  return {
    type: 'SET_USER_PHONE',
    phone,
  };
}

/* Sets the user's type ('newUser' or 'existingUser') to store. */
export function setUserType(userType) {
  return {
    type: 'SET_USER_TYPE',
    userType,
  };
}

/* Sets the user's avatar url to store when a new user is created. */
export function setAvatar(avatar) {
  return {
    type: 'SET_AVATAR',
    avatar,
  };
}

/* Sets the user's contact list to store once it has been fetched from the database. */
export function setContactList(contactList) {
  return {
    type: 'SET_CONTACT_LIST',
    contactList,
  };
}

/* Fetches the user's contact list from the database. */
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

/* Sets an error message to store if an exhisting user's information is incorrect. */
export function setLoginError(loginError) {
  return {
    type: 'SET_LOGIN_ERROR',
    loginError,
  };
}

/* Sends a POST request to the server to validate the user's email address and password.
Returns all relevent user information and sets it to store. */
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

/* Sets an error to store when the user does not fill in the create user form correctly. */
export function setNewUserError(newUserError) {
  return {
    type: 'SET_NEW_USER_ERROR',
    newUserError,
  };
}

/* Sends a POST request to the server to create a new user account in the database
with the informtion supplied from store. */
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

/* Resets the view stage to the log in page on log out. */
export function resetStage() {
  return {
    type: 'RESET_STAGE',
  };
}

/* Resets the balances page after user logs out. */
export function resetBalances() {
  return {
    type: 'RESET_BALANCES',
  };
}

/* Resets the users contacts when the user logs out. */
export function resetContacts() {
  return {
    type: 'RESET_CONTACTS',
  };
}

/* Resets the payment reducer in store when the user logs out. */
export function resetPayment() {
  return {
    type: 'RESET_PAYMENT',
  };
}

/* Resets the user reducer in store when the user logs out. */
export function resetUser() {
  return {
    type: 'RESET_USER',
  };
}

/* Resets the round reducer in store when the user logs out. */
export function resetRound() {
  return {
    type: 'RESET_ROUND',
  };
}

/* Dispaches all store reset actions when the user logs out. */
export function logoutUser() {
  return dispatch => {
    dispatch(resetStage());
    dispatch(resetUser());
    dispatch(resetContacts());
    dispatch(resetBalances());
    dispatch(resetPayment());
    dispatch(resetRound());
  };
}

// ROUND ACTIONS

/* Assigns the user as the round buyer in the 'round' reducer when a new tab is opened. */
export function setRoundBuyer(buyerId) {
  return {
    type: 'SET_ROUND_BUYER',
    buyerId,
  };
}

/* Sets the round name in the 'round' reducer when a new tab is opened. */
export function setRoundName(roundName) {
  return {
    type: 'SET_ROUND_NAME',
    roundName,
  };
}

/* Sends a POST request to the server with a new round when a new round is ordered. */
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

/* Adds a recipient to the new round in the 'round' reducer. */
export function addRecipient(recipient) {
  return {
    type: 'ADD_RECIPIENT',
    recipient,
  };
}

/* Removes a recipient from the new round in the 'round' reducer. */
export function removeRecipient(recipient) {
  return {
    type: 'REMOVE_RECIPIENT',
    recipient,
  };
}

/* Sets the total amount for the new round in the 'round' reducer. */
export function setAmount(totalAmount) {
  return {
    type: 'SET_AMOUNT',
    totalAmount,
  };
}

/* Handles the adding and removing of a recipient of a round
and calculates the new total if the round was split manually.  */
export function handleRoundCounterparts(recipient) {
  return (dispatch, getState) => {
    const { recipients, splitType } = getState().round;
    if (!Object.keys(recipients).includes(recipient.toString())) {
      dispatch(addRecipient(recipient));
    } else {
      dispatch(removeRecipient(recipient));
      if (splitType === 'manual') {
        const newTotal = Object.keys(recipients)
          .filter(id => id !== recipient)
          .map(id => parseFloat(recipients[id].amount))
          .reduce((a, b) => a + b, 0);
        dispatch(setAmount(newTotal.toFixed(2)));
      }
    }
  };
}

/* Sets the split type ('even' or 'manual') for the new round in store. */
export function setSplitType(splitType) {
  return {
    type: 'SET_SPLIT_TYPE',
    splitType,
  };
}

/* Sets the recipients for a new round if one or more recipients are passed as an object when
a previous round is re-ordered. */
export function setRecipients(recipients) {
  return {
    type: 'SET_RECIPIENTS',
    recipients,
  };
}

/* Sets the individual recipient's cost for the new round in store
when the round is split manually and calculates the round total. */
export function setRecipientAmount(id, amount) {
  return (dispatch, getState) => {
    const { recipients } = getState().round;
    const newRecipients = Object.assign({}, recipients);
    newRecipients[id] = { amount: (Math.round(parseFloat(amount) * 100) / 100).toFixed(2) };
    const totalAmount = Object.values(newRecipients)
      .map(recipient => recipient.amount)
      .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
      .toFixed(2);
    dispatch(setAmount(totalAmount));
    dispatch(setRecipients(newRecipients));
  };
}

/* Calculates the cost of the round for each recipient when the round is split evenly.
If a round total is split in a way that does not equal the whole amount i.e.
£10 split 3 ways = £3.33 for each recipient, the remaining cost is assigned to a
random recipient. */
export function refreshRecipientAmounts() {
  return (dispatch, getState) => {
    const { recipients, totalAmount, splitType } = getState().round;
    if (splitType === 'even') {
      const newRecipients = Object.assign({}, recipients);
      Object.keys(newRecipients).forEach(recipientId => {
        newRecipients[recipientId] = {
          amount: (
            Math.round((parseFloat(totalAmount) / Object.keys(newRecipients).length) * 100) / 100
          ).toFixed(2),
        };
      });
      if (Object.values(newRecipients).length) {
        const residual =
          Math.round(
            (parseFloat(totalAmount) -
              Object.values(newRecipients)
                .map(recipient => recipient.amount)
                .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)) *
              100,
          ) / 100;
        const recipientIds = Object.keys(newRecipients);
        const randomId = recipientIds[Math.floor(Math.random() * recipientIds.length)];
        newRecipients[randomId] = {
          amount: (parseFloat(newRecipients[randomId].amount) + residual).toFixed(2),
        };
        dispatch(setRecipients(newRecipients));
      }
    }
  };
}

// BALANCES ACTIONS

/* Sets the balances for the user's contacts in store when
their balances are fetched from the database. */
export function setCounterpartBalances(balances) {
  return {
    type: 'SET_COUNTERPART_BALANCES',
    balances,
  };
}

/* Sets the users balance in store when it is fetched from the database. */
export function setUserBalance(balance) {
  return {
    type: 'SET_USER_BALANCE',
    balance,
  };
}

/* Fetches the balances of the user and the users contacts from the database and dispatches
actions to set them in store. */
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
          dispatch(getContactList(userId));
        } else if (response.status === 404) {
          dispatch(setUserBalance(0));
          dispatch(setCounterpartBalances({}));
        }
      });
  };
}

/* Settles the debt of a user and their contact as if they have settled their tab offline.
This is used when the user is the 'lender' or the 'debtor', and sets the balances between
the user and thier counterpart to £0.00. */
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
      .then(res => {
        dispatch(fetchBalances(payerId));
        res.json();
      })
      .catch(error => console.log(error));
  };
}

/* Shows or hides the payment modal. */
export function showPayment(payment, receiverId) {
  return {
    type: 'SHOW_PAYMENT',
    payment,
    receiverId,
  };
}

// CONTACTS ACTIONS

/* Resets the value of the contact 'searchString' in store, used to search for new contacts,
in store to an empty string. */
export function resetContactSearch() {
  return {
    type: 'RESET_CONTACT_SEARCH',
  };
}

/* onChange event handler that updates the contact 'searchString' in store from the search input. */
export function setContactSearchString(text) {
  return {
    type: 'SET_CONTACT_SEARCH_STRING',
    text,
  };
}

/* Sets the value of 'searchResults' in store. */
export function setContactSearchResults(results) {
  return {
    type: 'SET_CONTACT_SEARCH_RESULTS',
    results,
  };
}

/* Resets the value of 'searchResults' in store to an empty array. */
export function resetContactSearchResults() {
  return {
    type: 'RESET_CONTACT_SEARCH_RESULTS',
  };
}

/* Once the user enters at least 3 characters into the contact search input,
this makes a GET request to find users that match the user's search. */
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

/* Adds a contact to the users contact list. */
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
          dispatch(getContactList(userId));
        }
      });
  };
}

/* When a user adds a new contact, the contact will be propmted to
'approve' the user as a new contact. This changes the users status in the database to
be an 'approved' contact. */
export function approveContact(contactId) {
  return (dispatch, getState) => {
    const userId = getState().user.id;
    fetch('/api/approve-contact', {
      method: 'POST',
      body: JSON.stringify({ userId, contactId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(getContactList(userId));
        }
      });
  };
}

// TABS ACTIONS

/* Populates a new round with the information from a previously ordered round. */
export function reOrder(round) {
  return (dispatch, getState) => {
    const userId = getState().user.id;
    const counterparts = Object.assign({}, round.counterparts);
    Object.keys(counterparts).forEach(key => {
      counterparts[key] = { amount: (-parseFloat(counterparts[key].amount)).toFixed(2) };
    });
    const roundAmounts = Object.values(counterparts).map(counterpart =>
      parseFloat(counterpart.amount),
    );
    const roundTotal = roundAmounts.reduce((acc, val) => acc + val).toFixed(2);
    const splitEven = roundAmounts.every((val, i, arr) => Math.abs(val - arr[0]) < 0.02);
    dispatch(setSplitType(splitEven ? 'even' : 'manual'));
    dispatch(setRoundBuyer(userId));
    dispatch(setRecipients(counterparts));
    dispatch(setAmount(roundTotal));
    dispatch(setRoundName(round.roundName));
    dispatch(setStage('newRound'));
  };
}

/* Sets the results of fetchRoundHistory to store. */
export function receiveRoundHistory(roundHistory) {
  return {
    type: 'SET_ROUND_HISTORY',
    roundHistory,
  };
}

/* Sends a GET request to the server to fetch the information on all rounds
that the user has bought or been bought by a contact. */
export function fetchRoundHistory(userId) {
  return dispatch => {
    fetch(`/api/get-rounds/${userId}`)
      .then(response => response.json())
      .then(data => {
        dispatch(receiveRoundHistory(data));
      });
  };
}
