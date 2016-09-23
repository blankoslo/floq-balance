import React, { Component } from 'react';

const isValid = input => input.match(/^((\d|[1-9]\d+)(\.5)?|\.5)$/);

class BilledHoursCell extends Component {
  state = {
    value: this.props.value
  };

  onChange = e => {
    const newValue = e.target.value;
    this.setState({ value: newValue });
    if (!isValid(newValue) || newValue === this.props.value) return;
    this.props.onChange(this.props.project, newValue * 60, this.props.fee);
  };

  render() {
    return (<td>
      <input
        type='text'
        value={this.state.value}
        className={isValid(this.state.value) ? '' : 'field-error'}
        onChange={this.onChange}
      />
    </td>);
  }
}

BilledHoursCell.propTypes = {
  value: React.PropTypes.string.isRequired,
  project: React.PropTypes.string.isRequired,
  fee: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default BilledHoursCell;
