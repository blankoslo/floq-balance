// @flow

import React, { Component } from 'react';

const isValid = input => input.match(/^((\d|[1-9]\d+)(\.5)?|\.5)$/);

class BilledHours extends Component {

  onChange = e => {
    const newValue = e.target.value.trim() === '' ? '0' : e.target.value;
    this.props.onInputChange(this.props.project, 'billedHours', newValue);
    if (newValue === this.props.value.toString()) return;
    if (!isValid(newValue)) return;
    this.props.onValueChange(this.props.project, Number(newValue) * 60, this.props.fee);
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

BilledHours.propTypes = {
  value: React.PropTypes.number.isRequired,
  input: React.PropTypes.string.isRequired,
  project: React.PropTypes.string.isRequired,
  fee: React.PropTypes.number.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
};

export default BilledHours;
