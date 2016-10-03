import React from 'react';

const BalanceViewBodyCell = props => (
  <td className='static-data'>{Math.abs(props.value) < 0.1 ? '' : props.value.toFixed(1)}</td>
);

BalanceViewBodyCell.propTypes = {
  value: React.PropTypes.number.isRequired,
};

export default BalanceViewBodyCell;
