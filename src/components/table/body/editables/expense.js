// @flow

import React, { Component } from 'react';

const isValid = input => input.match(/^((\d|[1-9]\d+)(\.\d{1,2})?|\.\d{1,2})$/);

class Expense extends Component {

  onChange = e => {
    const newValue = e.target.value.trim() === '' ? '0' : e.target.value;
    this.props.onInputChange(
      this.props.project,
      this.props.type === 'other' ? 'expense' : this.props.type,
      newValue);

    if (newValue === this.props.value.toString()) return;
    if (!isValid(newValue)) return;
    this.props.onValueChange(this.props.project, this.props.type, Number(newValue));
  };

  render() {
    return (<td>
      <input
        type='text'
        value={this.props.input === '0' ? '' : this.props.input}
        className={isValid(this.props.input) ? '' : 'field-error'}
        onChange={this.onChange}
      />
    </td>);
  }
}

Expense.propTypes = {
  value: React.PropTypes.number.isRequired,
  input: React.PropTypes.string.isRequired,
  project: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
};

export default Expense;
