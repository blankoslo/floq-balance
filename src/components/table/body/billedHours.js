import React, { Component } from 'react';

const isValid = input => input.match(/^((\d|[1-9]\d+)(\.5)?|\.5)$/);

const roundHalf = num => Math.round(num * 2) / 2;

class BilledHoursCell extends Component {
  state = {
    value: this.props.value === 0 ? '0' : roundHalf(this.props.value / 60).toString()
  };

  onChange = e => {
    const newValue = e.target.value.trim() === '' ? '0' : e.target.value;
    this.setState({ value: newValue });
    if (newValue === this.props.value.toString()) return;
    if (!isValid(newValue)) return;
    this.props.onChange(this.props.project, newValue * 60, this.props.fee);
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

BilledHoursCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  project: React.PropTypes.string.isRequired,
  fee: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default BilledHoursCell;
