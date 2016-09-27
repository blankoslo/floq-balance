// @flow

import React, { Component } from 'react';

const isValid = input => input.match(/^((\d|[1-9]\d+)(\.5)?|\.5)$/);

class WriteOffCell extends Component {
  state = {
    value: this.props.value.toString()
  };

  onChange = e => {
    const newValue = e.target.value.trim() === '' ? '0' : e.target.value;
    this.setState({ value: newValue });
    if (this.props.value.toString() === newValue) return;
    if (!isValid(newValue)) return;
    this.props.onChange(this.props.project, newValue * 60);
  };

  render() {
    return (<td>
      <input
        type='text'
        value={this.state.value === '0' ? '' : this.state.value}
        className={isValid(this.state.value) ? '' : 'field-error'}
        onChange={this.onChange}
      />
    </td>);
  }
}

WriteOffCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  project: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default WriteOffCell;
