// @flow

import React, { Component } from 'react';

const isValid = input => input.match(/^((\d|[1-9]\d+)(\.5)?|\.5)$/);

class WriteOffCell extends Component {

  onChange = e => {
    const newValue = e.target.value.trim() === '' ? '0' : e.target.value;
    this.props.onInputChange(this.props.project, 'writeOff', newValue);
    if (this.props.value.toString() === newValue) return;
    if (!isValid(newValue)) return;
    this.props.onValueChange(this.props.project, Number(newValue) * 60);
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

WriteOffCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  input: React.PropTypes.string.isRequired,
  project: React.PropTypes.string.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
};

export default WriteOffCell;
