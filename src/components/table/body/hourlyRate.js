import React from 'react';

const calculate = (fee, expense, timeEntry) => {
  if (!timeEntry || !fee) return '';
  return ((fee - expense) / timeEntry).toFixed(1);
};

const ExpenseCell = props =>
  <td>{calculate(props.fee, props.expense, props.timeEntry)}</td>;

ExpenseCell.propTypes = {
  fee: React.PropTypes.number.isRequired,
  expense: React.PropTypes.number.isRequired,
  timeEntry: React.PropTypes.number.isRequired,

};

export default ExpenseCell;
