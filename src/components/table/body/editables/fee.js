import PropTypes from "prop-types";
import React, { Component } from "react";

const isValid = input => input.match(/^((\d|[1-9]\d+)(\.\d{1,2})?|\.\d{1,2})$/);

class Fee extends Component {

  onChange = e => {
    const newValue = e.target.value.trim() === '' ? '0' : e.target.value;
    this.props.onInputChange(this.props.project, 'fee', newValue);
    if (newValue === this.props.value.toString()) return;
    if (!isValid(newValue)) return;
    this.props.onValueChange(this.props.project, this.props.billedMinutes, Number(newValue));
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

Fee.propTypes = {
  value: PropTypes.number.isRequired,
  input: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  billedMinutes: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default Fee;
