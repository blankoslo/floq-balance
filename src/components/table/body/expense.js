import React, { Component } from 'react';

const isValid = input => input.match(/^((\d|[1-9]\d+)(\.\d{1,2})?|\.\d{1,2})$/);

class ExpenseCell extends Component {
  state = {
    value: this.props.value
  };

  onChange = e => {
    const newValue = e.target.value;
    this.setState({ value: newValue });
    if (!isValid(newValue) || newValue === this.props.value) return;
    this.props.onChange(this.props.project, this.props.type, Number(newValue));
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

ExpenseCell.propTypes = {
  value: React.PropTypes.string.isRequired,
  project: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default ExpenseCell;
