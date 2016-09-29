import React from 'react';

const calculate = (fee, expense, timeEntry) => {
  if (!timeEntry || !fee) return 0;
  return ((fee - expense) / (timeEntry / 60)).toFixed(1);
};

const ExpenseCell = props => {
  const value = calculate(props.fee, props.expense, props.timeEntryMinutes);
  return <td className='static-data'>{Math.abs(value) < 0.1 ? '' : value}</td>;
};

ExpenseCell.propTypes = {
  fee: React.PropTypes.number.isRequired,
  expense: React.PropTypes.number.isRequired,
  timeEntryMinutes: React.PropTypes.number.isRequired,
};

export default ExpenseCell;
