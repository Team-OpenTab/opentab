import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/NewRound.scss';

class NewRoundRecipient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: parseFloat(props.recipients[props.recipient].amount),
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { splitType, recipients, recipient } = nextProps;
    if (splitType === 'manual' && splitType !== this.props.splitType) {
      this.setState({
        value: recipients[recipient].amount,
      });
    }
  }

  handleFocus() {
    this.setState({
      value: '',
    });
    this.props.getRecipientAmount(this.props.recipient, 0);
  }

  handleBlur(event) {
    this.setState({
      value: parseFloat(event.target.value).toFixed(2),
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
    this.props.getRecipientAmount(this.props.recipient, event.target.value);
  }

  render() {
    const {
      counterparts,
      recipients,
      recipient,
      handleRoundCounterparts,
      splitType,
      contacts,
    } = this.props;
    return (
      <div className="new-round-recipient-container user-added">
        <div className="user-container">
          <img
            className="user-container__avatar"
            src={
              contacts.filter(item => item.contact_id === Number(recipient)).length
                ? contacts.filter(item => item.contact_id === Number(recipient))[0].avatar === ''
                  ? `https://ui-avatars.com/api/rounded=true?name=${
                    counterparts[recipient].username
                  }&size=50&background=eaae60`
                  : contacts.filter(item => item.contact_id === Number(recipient))[0].avatar
                : ''
            }
            alt=""
          />
          <h3 className="user-container__name">{counterparts[recipient].username}</h3>
        </div>

        <p>£&nbsp;</p>
        {splitType === 'manual' ? (
          <input
            className="new-round__input"
            value={this.state.value}
            type="number"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
          />
        ) : (
          <div className="new-round__input">
            {parseFloat(recipients[recipient].amount).toFixed(2)}
          </div>
        )}

        <button
          className="new-round-add-remove-btn"
          type="button"
          onClick={() => handleRoundCounterparts(recipient)}
        >
          {!Object.keys(recipients).includes(recipient.toString()) ? (
            <i className="fas fa-plus-circle" />
          ) : (
            <i className="fas fa-minus-circle" />
          )}
        </button>
      </div>
    );
  }
}

NewRoundRecipient.propTypes = {
  counterparts: PropTypes.object.isRequired,
  recipients: PropTypes.object.isRequired,
  recipient: PropTypes.string.isRequired,
  getRecipientAmount: PropTypes.func.isRequired,
  handleRoundCounterparts: PropTypes.func.isRequired,
  splitType: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
};

export default NewRoundRecipient;
