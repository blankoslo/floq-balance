import React, { Component } from 'react';

const isValid = input => input.match(/^((\d|[1-9]\d+)(\.\d{1,2})?|\.\d{1,2})$/);

class ExpenseCell extends Component {
  state = {
    value: this.props.value.toString()
  };

  onChange = e => {
    const newValue = e.target.value.trim() === '' ? '0' : e.target.value;
    this.setState({ value: newValue });
    if (newValue === this.props.value.toString()) return;
    if (!isValid(newValue)) return;
    // TODO: Multiplying hours is kinda a hack, tweaking data in ways one shouldn't.
    // We should consequently use either hours or minutes in the frontend.
    // I'm suggesting minutes, as is what is stored in the database. Another extension
    // would be to use to upsert-functions for invoice_balanc. One for minutes / money
    this.props.onChange(this.props.project, this.props.billedHours * 60, Number(newValue));
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

ExpenseCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  project: React.PropTypes.string.isRequired,
  billedHours: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default ExpenseCell;
