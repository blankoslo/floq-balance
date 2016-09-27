import React from 'react';

const BalanceViewBodyCell = props => (
  <td className='static-data'>{props.value === 0 ? '' : props.value.toFixed(1)}</td>
);

BalanceViewBodyCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func,
};

export default BalanceViewBodyCell;
